const router = require("express").Router();
const Flight = require("../models/Flights");
const { isAuthenticated } = require("../helpers/validarSesion");

//Ver todos los vuelos
router.get("/vuelos", isAuthenticated, async (req, res) => {
  const vuelos = await Flight.find({ usuario: req.user.id }).lean();
  
  res.render("vuelos/todos-vuelo", { vuelos });

  //res.send("Ver todos los vuelos");
});

//Formulario para agregar vuelos
router.get("/vuelos/agregar", isAuthenticated, (req, res) => {
  res.render("vuelos/nuevo-vuelo");
});

//Mostrar formulario para editar los vuelos
router.get("/vuelos/editar/:id", isAuthenticated, async (req, res) => {
  const vuelo = await Flight.findById(req.params.id).lean();

  //Validacion si el usuario X quiere editar un vuelo del usuario Y ingresando la ruta manualmente
  if (vuelo.usuario != req.user.id) {
    return res.redirect("/vuelos");
  }
  res.render("vuelos/editar-vuelo", { vuelo });
});

//Actualiza la informacion del vuelo
router.put("/vuelos/editar/:id", isAuthenticated, async (req, res) => {
  const { origen, destino, cantBoleto } = req.body;

  await Flight.findByIdAndUpdate(req.params.id, {
    origen,
    destino,
    cantBoleto,
  });
  req.flash("success_msg", "Vuelo actualizado correctamente");
  res.redirect("/vuelos");
});

//Eliminar vuelos
router.delete("/vuelos/eliminar/:id", isAuthenticated, async (req, res) => {
  const vueloId = req.params.id;
  await Flight.findByIdAndDelete(vueloId);
  req.flash("success_msg", "Vuelo eliminado correctamente");
  res.redirect("/vuelos");
});
module.exports = router;
