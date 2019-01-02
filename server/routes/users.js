const express = require('express');
const router = express.Router();

//model imports
const User = require("../models/user");

/**
 * /api/users/register
 * POST
 * 
 */
router.post("/register", (req, res)=>{
  const newUser = new User(req.body);
  
  newUser.save((err, doc)=>{
    if(err) return res.json({success: false, err})
    //no error, proceed
    res.status(200).json({
      success: true,
      userData: doc
    })
  })
})
/**
 * /api/users/login
 * POST
 * 
 */
router.post("/login", (req, res)=>{
  // find email
  User.findOne({'email': req.body.email}, (err, user)=>{
    if(!user) return res.json({
      loginSuccess: false,
      message: "Auth failed, email not found"
    })
    //email found, check password match
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch) return res.json({
        loginSuccess: false,
        message: "Wrong Password"
      })
      //passwords match, generate a token
      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err)
        //no err, save token to cookies
        res.cookie("f_auth", user.token).status(200).json({loginSuccess: true})
      })
    })
  })
})



module.exports = router;