const router = require("express").Router();

const {
  verTodosUsuarios,
  verVuelosUsuarios,
} = require("../controllers/admin.controller");
const { isAdmin } = require("../helpers/validarSesion");

router.get("/admin/users",isAdmin, verTodosUsuarios);

router.get("/admin/ver/vuelos/:id", isAdmin,verVuelosUsuarios);

module.exports = router;
