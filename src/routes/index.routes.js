const router = require("express").Router();
const { isAdmin, isAuthenticated } = require("../helpers/validarSesion");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
