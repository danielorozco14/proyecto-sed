const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const vueloSchema = new Schema(
  {
    origen: String,
    destino: String,
    cantBoleto: {
      type: Number,
      min: 1,
      max: 10,
    },
    usuario: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    tarjeta: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

vueloSchema.methods.encriptarTarjeta = async (tarjeta) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(tarjeta, salt);
};

vueloSchema.methods.matchTarjeta = async function (tarjeta) {
  return await bcrypt.compare(tarjeta, this.tarjeta);
};

module.exports = model("Vuelo", vueloSchema);
