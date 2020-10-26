const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    email: String,
    password: String,
  },
  {
    timestamps: true
  }
);

userSchema.methods.encriptarPasswd = async (password) => {
  const salt = await bcrypt.genSalt(15);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPasswd = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
