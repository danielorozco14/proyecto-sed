const router = require("express").Router();

const {
  renderLoginForm,
  Login,
  renderRegisterForm,
  Register,
  logOut,
} = require("../controllers/user.controller");

//Mostrar formulario de inicio de sesion
router.get("/user/login", renderLoginForm);

//Maneja el inicio de sesion
router.post("/user/login", Login);

//Mostrar formulario de registro
router.get("/user/register", renderRegisterForm);

//Maneja el registro del usuario
router.post("/user/register", Register);

//Maneja el logout
router.get("/user/logout", logOut);

module.exports = router;
