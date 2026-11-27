const Gep = require("../models/Gep");
const Processzor = require("../models/Processzor");
const Oprendszer = require("../models/Oprendszer");
function urlapAdat(body) {
    return {gyarto: body.gyarto, tipus: body.tipus, kijelzo: body.kijelzo, memoria: body.memoria, merevlemez: body.merevlemez, videovezerlo: body.videovezerlo, ar: body.ar, processzorid: body.processzorid, oprendszerid: body.oprendszerid, db: body.db};
}
async function index(req, res) {
    const gepek = await Gep.find();
    res.render("crud/index", { gepek });
}
async function newForm(req, res) {
    const processzorok = await Processzor.find();
    const oprendszerek = await Oprendszer.find();
    res.render("crud/new", { gep: {}, errors: {}, processzorok, oprendszerek });
}
async function insert(req, res) {
    try {
        await Gep.create(urlapAdat(req.body));
        req.session.message = "Az új notebook mentése sikerült.";
        res.redirect("/crud");
    }
    catch (err) {
        console.error(err);
        if (err.name === "ValidationError") {
            const processzorok = await Processzor.find();
            const oprendszerek = await Oprendszer.find();
            return res.render("crud/new", { gep: req.body, errors: err.errors, processzorok, oprendszerek });
        }
        res.status(500).send("Internal server error.");
    }
}
async function editForm(req, res) {
    const gep = await Gep.findById(req.params.id);
    if (!gep) {
        return res.redirect("/crud");
    }
    const processzorok = await Processzor.find();
    const oprendszerek = await Oprendszer.find();
    res.render("crud/edit", { gep, errors: {}, processzorok, oprendszerek });
}
async function update(req, res) {
    try {
        await Gep.findByIdAndUpdate(req.body.id, urlapAdat(req.body), {new: true, runValidators: true});
        req.session.message = "A notebook módosítása sikerült.";
        res.redirect("/crud");
    }
    catch (err) {
        console.error(err);
        if (err.name === "ValidationError" || err.name === "CastError") {
            const processzorok = await Processzor.find();
            const oprendszerek = await Oprendszer.find();
            const errors = err.name === "ValidationError" ? err.errors : { [err.path]: { message: "Hibás érték!" } };
            return res.render("crud/edit", { gep: { _id: req.body.id, ...req.body }, errors, processzorok, oprendszerek });
        }
        res.status(500).send("Internal server error.");
    }
}
async function remove(req, res) {
    await Gep.findByIdAndDelete(req.params.id);
    req.session.message = "A notebook törlése sikerült.";
    res.redirect("/crud");
}
module.exports = {index, newForm, insert, editForm, update, remove};
