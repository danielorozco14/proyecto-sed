const mongoose = require("mongoose");

const USUARIO_DB = "aeropuertoUser";
const PWD_DB = "Mlo9$rGH";
const IP_DB = "127.0.0.1:27017";


mongoose
  .connect(
    `mongodb://${USUARIO_DB}:${PWD_DB}@${IP_DB}/aeropuerto?authSource=aeropuerto`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error(error));
