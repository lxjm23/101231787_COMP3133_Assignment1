const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstname:{
    type: String,
    required: [true, "Please enter first name"],
    trim: true,
    lowercase: true
  },
  lastname:{
    type: String,
    alias: "surname",
    required: true,
    trim: true,
    lowercase: true
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
  gender:{
    type: String,
    required: true,
    enum: ["male", "female", "other"],
    trim: true,
    lowercase: true
  }, 
  salary:{
    type: Number,
    default: 0.0,
    validate(value) {
      if (value < 0.0){
         throw new Error("Negative Salary are not valid.");
      }
    }
  }
});

const Employee = mongoose.model("Employee", employeeSchema)
module.exports = Employee;