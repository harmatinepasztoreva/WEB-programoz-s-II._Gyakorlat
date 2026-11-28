require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const connectDB = require("./config/db");
const app = express();
connectDB();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.SESSION_MONGO_URI, collectionName: "sessions"})
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.message = req.session.message || "";
    res.locals.path = req.path;
    req.session.message = "";
    next();
});
app.use("/", require("./routes/mainRouter"));
app.use((req, res) => {
    res.status(404).render("error", { hiba: "Az oldal nem található." });
});
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).render("error", { hiba: "Hiba történt a kérés feldolgozása közben." });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server: http://localhost:${port}`);});