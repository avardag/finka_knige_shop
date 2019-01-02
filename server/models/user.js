const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 40
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 60
  },
  cart:{
    type: Array,
    default: []
  },
  history:{
    type: Array,
    default: []
  },
  role:{
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
})


const User = mongoose.model("User", userSchema);


module.exports = User;