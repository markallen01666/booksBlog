// User database schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require("bcrypt");


const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter user name"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter password"]
  }
});

UserSchema.plugin(uniqueValidator)    // Handle error on duplicate username

UserSchema.pre("save", function(next) {
  const user = this;

  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
