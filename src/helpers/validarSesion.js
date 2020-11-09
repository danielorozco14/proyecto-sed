const helper = {};

helper.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Necesitas iniciar sesion");
  res.redirect("/user/login");
};

helper.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin == true) {
    return next();
  }
  req.flash("error_msg", "No eres administrador");
  res.redirect("/");
};

module.exports = helper;
