const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username."],
    lowercase: true,
    unique: [true, "Username must be unique."]
  },
  email:{
    type: String,
    required: true,
    unique: [true, "Email must be unique"],
    trim: true,
    lowercase: true,
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    trim: true
  }
})

const User = mongoose.model("User", userSchema)
module.exports = User;