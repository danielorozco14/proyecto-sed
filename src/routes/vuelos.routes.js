const router = require("express").Router();
const Flight = require("../models/Flights");

//Ver todos los vuelos
router.get("/vuelos", async (req, res) => {
  const vuelos = await Flight.find().lean();
  res.render("vuelos/todos-vuelo", { vuelos });

  //res.send("Ver todos los vuelos");
});

//Formulario para agregar vuelos
router.get("/vuelos/agregar", (req, res) => {
  res.render("vuelos/nuevo-vuelo");
});

//Maneja el ingreso de las vuelos
router.post("/vuelos/agregar", async (req, res) => {
  const { origen, destino, cantBoleto } = req.body;
  const nuevoVuelo = new Flight({
    origen,
    destino,
    cantBoleto,
  });
  //console.log(nuevoVuelo);
  await nuevoVuelo.save();
  req.flash("success_msg", "Vuelo agregado correctamente");
  res.redirect("/vuelos");
});

//Mostrar formulario para editar los vuelos
router.get("/vuelos/editar/:id", async (req, res) => {
  const vuelo = await Flight.findById(req.params.id).lean();
  //console.log(vuelo);
  res.render("vuelos/editar-vuelo", { vuelo });
});

//Actualiza la informacion del vuelo
router.put("/vuelos/editar/:id", async (req, res) => {
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
router.delete("/vuelos/eliminar/:id", async (req, res) => {
  const vueloId = req.params.id;
  await Flight.findByIdAndDelete(vueloId);
  req.flash("success_msg", "Vuelo eliminado correctamente");
  res.redirect("/vuelos");
});
module.exports = router;
