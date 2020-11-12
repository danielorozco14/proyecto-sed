const router = require("express").Router();
const { isAdmin } = require("../helpers/validarSesion");

const {
  verTodosUsuarios,
  verVuelosUsuarios,
  eliminarVueloUsuario
} = require("../controllers/admin.controller");


router.get("/admin/users",isAdmin, verTodosUsuarios);

router.get("/admin/ver/vuelos/:id", isAdmin,verVuelosUsuarios);

router.delete("/admin/eliminar/vuelo/:id", isAdmin,eliminarVueloUsuario )
module.exports = router;
