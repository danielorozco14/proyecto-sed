const express = require("express");
const app = express();
const path = require("path");
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

/*
  Base de datos
*/

require("./database"); //Importa la configuracion de MongoDB desde el archivo database.js

/*
    Configuraciones
*/
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views")); //Configurando Node para la carpeta views, donde iran las vistas
app.engine(
  ".hbs",
  hbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs"); //Configurando el motor de vistas

/*
    Middlewares
*/

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(methodOverride("_method"));
app.use(
  session({
    secret: "x3GhJKlmN",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

/*
    Variables Globales
*/

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");

  next();
});

/*
    Rutas
*/
app.use(require("./routes/index.routes"));
app.use(require("./routes/vuelos.routes"));
app.use(require("./routes/users.routes"));

/*
    Archivos Estaticos
*/

app.use(express.static(path.join(__dirname, "public")));

/*
    Puerto de escucha
*/

app.listen(app.get("port"), () => {
  console.log("Servidor en puerto: ", app.get("port"));
});
