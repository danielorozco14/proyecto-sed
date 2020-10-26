const { Schema, model } = require("mongoose");

const vueloSchema = new Schema(
  {
    origen: String,
    destino: String,
    cantBoleto: {
      type: Number,
      min: 1,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Vuelo", vueloSchema);
