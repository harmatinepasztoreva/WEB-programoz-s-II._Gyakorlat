const Gep = require("../models/Gep");
async function index(req, res) {
    const gepek = await Gep.find();
    res.render("crud/index", { gepek });
}
async function remove(req, res) {
    await Gep.findByIdAndDelete(req.params.id);
    req.session.message = "A notebook törlése sikerült.";
    res.redirect("/crud");
}
module.exports = {index, remove};
