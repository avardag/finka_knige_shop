const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_I = 10;
const jwt = require('jsonwebtoken');
require("dotenv").config();
const crypto = require("crypto");
const moment = require("moment");

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
  },
  resetToken: {
    type: String
  },
  resetTokenExpire: {
    type: Number
  },
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
//method to compare password
userSchema.methods.comparePassword = function(candidatePassword, cb){
  bcrypt.compare(candidatePassword, this.password, (err, isMatch)=>{
    if(err) return cb(err)
    cb(null, isMatch);//null for err
  })
}

//mw method to generate a JWT token
userSchema.methods.generateToken = function(cb){
  let user= this;
  // const payload = { 
  //   _id: user._id.toHexString(), 
  //   firstName: user.firstName,
  //   lastName: user.lastName
  // }; //creates JWT payload
  let token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET_KEY)
  //save token to user models token field
  user.token = token;
  user.save(function(err, user){
    if(err) return cb(err);
    cb(null, user);//null for err, and retrn user
  })
}

//mw method to generate a password reset token
userSchema.methods.generateResetToken = function(cb){
  let user= this;
  
  crypto.randomBytes(20, function(err, buffer){
    let token = buffer.toString("hex");
    //set token expiration date(tomorrows date)
    let today = moment().startOf("day").valueOf(); // -> 1565647200000
    let tomorrow = moment(today).endOf("day").valueOf(); // -> 1565733599999
    //save random token to user models resetToken field
    user.resetToken = token;
    //save tomorrows date to user models resetTokenExp field
    user.resetTokenExpire = tomorrow;
    //save the model
    user.save(function(err, user){
      if(err) return cb(err);
      cb(null, user);
    })
  })
}

userSchema.statics.findByToken = function(token, cb){
  let user = this;
  //check math of user._id using jwt.verify
  jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decode){ 
    //decode is decoded info(in our case user._id)
    user.findOne({"_id": decode, "token": token}, function(err, user){
      if(err) return cb(err);
      cb(null, user);
    })
  })
}
const User = mongoose.model("User", userSchema);


module.exports = User;