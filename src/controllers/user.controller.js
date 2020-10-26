const userController = {};

userController.renderLoginForm = (req, res) => {
  res.render("authentication/login");
};

userController.Login = (req, res) => {
  res.send("Logiin");
};

userController.renderRegisterForm = (req, res) => {
  res.render("authentication/register");
};

userController.Register = (req, res) => {
  res.send("Registrarse");
};

userController.logOut = (req, res) => {
  res.send("Logout");
};

module.exports = userController;
