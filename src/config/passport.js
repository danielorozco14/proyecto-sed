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
        return done(null, false, { message: "Usuario no encontrado" });
      } else {
        //Validando la contrasenia

        const pass = await user.matchPasswd(password);
        if (pass) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});
