const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_I = 10;

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

//Middleware to hash password before save
userSchema.pre("save", function(next){
  let user = this; //not required in arrow func
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_I, function(err, salt){
    if(err) return next(err)
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    })
  })
})

const User = mongoose.model("User", userSchema);


module.exports = User;