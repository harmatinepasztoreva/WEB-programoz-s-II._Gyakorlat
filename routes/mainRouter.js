const router = require("express").Router();
const controller = require("../controllers/mainController");
const gepController = require("../controllers/gepController");

isLoggedIn=(req,res,next)=>{
    if(req.session.user){return next();}
    res.redirect("/login");
}
isAdmin=(req,res,next)=>{
    if(req.session.user && req.session.user.role==="admin"){return next();}
    res.redirect("/");
}

router.get("/", controller.homeIndex);
router.get("/adatbazis", controller.adatbazisIndex);
router.get("/kapcsolat", controller.kapcsolatGet);
router.post("/kapcsolat", controller.kapcsolatPost);
router.get("/register", controller.registerGet);
router.post("/register", controller.registerPost);
router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);
router.get("/logout", controller.logout);
router.get("/user", isLoggedIn, controller.userIndex);
router.get("/admin", isAdmin, controller.adminIndex);
router.get("/uzenetek", isLoggedIn, controller.uzenetekIndex);
router.get("/diagram", isLoggedIn, controller.diagramIndex);
router.get("/crud", isAdmin, gepController.index);
router.get("/crud/new", isAdmin, gepController.newForm);
router.post("/crud/insert", isAdmin, gepController.insert);
router.get("/crud/edit/:id", isAdmin, gepController.editForm);
router.post("/crud/update", isAdmin, gepController.update);
router.get("/crud/delete/:id", isAdmin, gepController.remove);
module.exports = router;