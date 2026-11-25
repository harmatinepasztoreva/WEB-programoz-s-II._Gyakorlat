const User = require("../models/User");
const bcrypt = require("bcrypt");
const Gep = require("../models/Gep");
const Processzor = require("../models/Processzor");
const Oprendszer = require("../models/Oprendszer");
const Uzenet = require("../models/Uzenet");

exports.homeIndex = async (req, res) => {
    const gepek = await Gep.find();
    const processzorok = await Processzor.find();
    let raktaron = 0;
    const gyartok = [];
    gepek.forEach(g => {
        raktaron += g.db;
        if (!gyartok.includes(g.gyarto.toUpperCase())) { gyartok.push(g.gyarto.toUpperCase()); }
    });
    const ajanlat = gepek.filter(g => g.db > 0).sort((a, b) => a.ar - b.ar).slice(0, 3).map(g => {
        const p = processzorok.find(p => p.id === g.processzorid);
        return { gyarto: g.gyarto, tipus: g.tipus, kijelzo: g.kijelzo, memoria: g.memoria, ar: g.ar, processzor: p ? p.gyarto + " " + p.tipus : "" };
    });
    res.render("home", { gepDb: gepek.length, raktaron, gyartok: gyartok.sort(), ajanlat });
};
exports.userIndex = (req, res) => { res.render("user"); };
exports.adminIndex = (req, res) => { res.render("admin"); };

exports.registerGet = (req, res) => { res.render("register"); };
exports.registerPost = async (req, res) => {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        req.session.message = "Már van ilyen felhasználó!";
        return res.redirect("/register");
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({ username: req.body.username, password: hash, role: "user" });
    req.session.message = "Sikeres regisztráció! Most már bejelentkezhet.";
    res.redirect("/login");
};

exports.loginGet = (req, res) => { res.render("login"); };
exports.loginPost = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        req.session.message = "Nem sikerült a bejelentkezés!";
        return res.redirect("/login");
    }
    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok) {
        req.session.message = "Nem sikerült a bejelentkezés!";
        return res.redirect("/login");
    }
    req.session.user = { id: user._id, username: user.username, role: user.role };
    if (user.role === "admin") {
        res.redirect("/admin");
    } else {
        res.redirect("/user");
    }
};
exports.logout = (req, res) => {
    req.session.destroy(() => { res.redirect("/"); });
};
exports.adatbazisIndex = async (req, res) => {
    const gepek = await Gep.find();
    const processzorok = await Processzor.find();
    const oprendszerek = await Oprendszer.find();
    const gyartok = [];
    gepek.forEach(g => { if (!gyartok.includes(g.gyarto.toUpperCase())) { gyartok.push(g.gyarto.toUpperCase()); } });
    const valasztott = req.query.gyarto || "";
    const lista = gepek.filter(g => valasztott === "" || g.gyarto.toUpperCase() === valasztott).map(g => {
        const p = processzorok.find(p => p.id === g.processzorid);
        const o = oprendszerek.find(o => o.id === g.oprendszerid);
        return { gyarto: g.gyarto, tipus: g.tipus, kijelzo: g.kijelzo, memoria: g.memoria, merevlemez: g.merevlemez, videovezerlo: g.videovezerlo, ar: g.ar, db: g.db, processzor: p ? p.gyarto + " " + p.tipus : "-", oprendszer: o ? o.nev : "-" };
    });
    const osStat = oprendszerek.map(o => ({ nev: o.nev, darab: gepek.filter(g => g.oprendszerid === o.id).length }));
    res.render("adatbazis", { lista, gyartok: gyartok.sort(), valasztott, osStat, processzorDb: processzorok.length });
};

exports.kapcsolatGet = (req, res) => { res.render("kapcsolat", { urlap: {}, errors: {} }); };
exports.kapcsolatPost = async (req, res) => {
    try {
        await Uzenet.create({ nev: req.body.nev, email: req.body.email, targy: req.body.targy, uzenet: req.body.uzenet });
        req.session.message = "Köszönjük! Az üzenetét elmentettük.";
        res.redirect("/kapcsolat");
    } catch (err) {
        console.error(err);
        if (err.name === "ValidationError") {
            return res.render("kapcsolat", { urlap: req.body, errors: err.errors });
        }
        res.status(500).send("Internal server error.");
    }
};

exports.uzenetekIndex = async (req, res) => {
    const uzenetek = await Uzenet.find().sort({ datum: -1 });
    res.render("uzenetek", { uzenetek });
};
