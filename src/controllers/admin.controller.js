const Usuario = require("../models/Users");
const Vuelos = require("../models/Flights");
const adminController = {};

//Carga la pagina para ver todos los usuarios
adminController.verTodosUsuarios = async (req, res) => {
  const usuarios = await Usuario.find().lean();
  res.render("usuarios/todos-usuarios", { usuarios });
};

adminController.verVuelosUsuarios = async (req, res) => {
  const vuelos = await Vuelos.find({ usuario: req.params.id }).lean();

  res.render("usuarios/vuelos-usuario", { vuelos });
};

module.exports = adminController;
