const router = require("express").Router();
const Flight = require("../models/Flights");
const { isAuthenticated } = require("../helpers/validarSesion");

let mPrecio;

router.post("/vuelos/boleto", isAuthenticated, async (req, res) => {
  const { origen, destino, cantBoleto } = req.body;

  if (origen === destino) {
    try {
      req.flash("error_msg", "Elije un destino distinto al origen");
      res.redirect("/vuelos/agregar");
    } catch (e) {
      console.log(e);
    }
  } else {
    const nuevoVuelo = new Flight({
      origen,
      destino,
      cantBoleto,
    });

    //Agregando el usuario que creo el vuelo, al modelo del vuelo
    nuevoVuelo.usuario = req.user.id;

    //Generando un precio para el boleto nuevoVuelo
    mPrecio = (
      parseInt(cantBoleto) *
      (Math.random() * (999 - 159) + 159)
    ).toFixed(2);

    nuevoVuelo.precio = mPrecio;
    const vuelo = nuevoVuelo.toObject();
    console.log(vuelo);
    res.render("vuelos/check-vuelo", { vuelo });
  }
});

router.post("/vuelos/procesar-pago", isAuthenticated, async (req, res) => {
  const {
    origen,
    destino,
    cantBoleto,
    precio,
    numTarjeta,
    mesExpiracion,
    anioExpiracion,
    cvv,
  } = req.body;

  //Expresion regex para validar que el numero de tarjeta solo contenga digitos
  const tarjetaSoloNumeros = /^\d+$/.test(numTarjeta);
  
  if (mPrecio != precio) {
    req.flash(
      "error_msg",
      "Hubo un error al procesar el pago, intente nuevamente"
    );
    res.redirect("/vuelos/agregar");
  } else if (numTarjeta.length == 0) {
    req.flash("error_msg", "Ingresa una tarjeta de credito");
    res.redirect("/vuelos/agregar");

  } else if(!tarjetaSoloNumeros){
    req.flash("error_msg", "Ingresa una tarjeta de credito valida");
    res.redirect("/vuelos/agregar");
  }else if (
    mesExpiracion.length == 0 ||
    anioExpiracion.length == 0 ||
    cvv.length == 0
  ) {
    req.flash(
      "error_msg",
      "Ingresa los datos de tu tarjeta de credito (Mes de Expiracion, Año de Expiracion, CVV) "
    );
    res.redirect("/vuelos/agregar");
  } else {
    const nuevoVuelo = new Flight({
      origen,
      destino,
      cantBoleto,
      precio,
    });

    nuevoVuelo.usuario = req.user.id;
    nuevoVuelo.tarjeta = await nuevoVuelo.encriptarTarjeta(numTarjeta);

    console.log(nuevoVuelo);

    try {
      await nuevoVuelo.save();
      req.flash("success_msg", "Vuelo agregado correctamente");
      res.redirect("/vuelos");
    } catch (e) {
      req.flash("error_msg", "Hubo un error, intentalo nuevamente");
      delete nuevoVuelo;
      res.redirect("/vuelos");
    }
  }
});

module.exports = router;
