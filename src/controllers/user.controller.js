const Usuario = require("../models/Users");
const userController = {};

const passport = require("passport");

//Muestra el form de login
userController.renderLoginForm = (req, res) => {
  //Si ya existe una sesion, se redirecciona a la pagina principal 
  //y no se muestra el form para login
  if (req.isAuthenticated()) {
    res.redirect("/");
  }else{
    res.render("authentication/login");
  }
  
};

//Da inicio de sesion al usuario
userController.Login = passport.authenticate("local", {
  failureRedirect: "/user/login",
  successRedirect: "/",
  successReturnToOrRedirect: "/",
  failureFlash: true,
});

//Muestra el form de registro
userController.renderRegisterForm = (req, res) => {
  res.render("authentication/register");
};

//Da registro al usuario
userController.Register = async (req, res) => {
  const { nombre, apellido, email, password, conf_password } = req.body;
  const errores = [];

  if (nombre.length == 0) {
    errores.push({
      msg: "Campo de nombre obligatorio",
    });
  }

  if (apellido.length == 0) {
    errores.push({
      msg: "Campo de apellido obligatorio",
    });
  }

  if (password != conf_password) {
    errores.push({ msg: "Las contraseñas no son iguales" });
  }

  if (password.length < 8) {
    errores.push({ msg: "Las contraseñas deben ser mayores a 8 caracteres" });
  }

  if (errores.length > 0) {
    res.render("authentication/register", {
      errores,
      nombre,
      apellido,
      email,
    });
  } else {
    const userEmail = await Usuario.findOne({
      email: email,
    });

    if (userEmail) {
      req.flash("error_msg", "El correo ya ha sido utilizado");
      res.redirect("/user/register");
    } else {
      //GUARDANDO EL USUARIO
      const newUsuario = new Usuario({
        nombre,
        apellido,
        email,
        password,
      });

      //Encriptando la contrasenia
      newUsuario.password = await newUsuario.encriptarPasswd(password); 

      await newUsuario.save();
      req.flash("success_msg", "Usuario registrado!");
      res.redirect("/");
    }
  }
};

//Termina la sesion de un usuario, si existe una sesion
userController.logOut = (req, res) => {
  req.logout();
  req.flash("success_msg", "Sesion terminada");
  res.redirect("/");
};

module.exports = userController;
