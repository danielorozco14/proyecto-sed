const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/aeropuerto", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error(error));
