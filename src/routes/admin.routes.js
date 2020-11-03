const router = require("express").Router();
const { isAdmin } = require("../helpers/validarSesion");

const {
  verTodosUsuarios,
  verVuelosUsuarios,
} = require("../controllers/admin.controller");


router.get("/admin/users",isAdmin, verTodosUsuarios);

router.get("/admin/ver/vuelos/:id", isAdmin,verVuelosUsuarios);

module.exports = router;
