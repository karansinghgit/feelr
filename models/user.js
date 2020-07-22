const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 35,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
});

module.exports = {
  User: mongoose.model("user", userSchema),
};
