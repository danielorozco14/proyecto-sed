const passport = require("passport");
const localStrategy = require("passport-local");
const Users = require("../models/Users");

const Usuario = require("../models/Users");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      //Confirmar si el email existe en la base de datos
      const user = await Usuario.findOne({
        email,
      });

      if (!user) {
        ///si el usuario no existe
        return done(null, false, { message: "Usuario no encontrado" });
      } else {
        //Validando la contrasenia

        const pass = await user.matchPasswd(password);
        if (pass) {
          if (user.admin == true) {
            
            return done(null, user);
          }
          return done(null, user); //Si las contrsenias coinciden, passport guarda el usuario y reconoce la sesion
        } else {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
      }
    }
  )
);

//Mantiene la sesion del usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Termina la sesion del usuario
passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});
