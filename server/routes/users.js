const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary");
const formidable = require('formidable'); //for managing file uploads

//MWare import
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

//model imports
const User = require("../models/user");

/**
 * authorization route
 * /api/users/auth
 * GET
 */
router.get("/auth", auth, (req, res)=>{
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  })
})

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
      success: true
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

/**
 * Logout route
 * '/api/users/logout'
 * GET
 */
router.get("/logout", auth, (req, res)=>{
  User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (err, doc)=>{
    if(err) return res.json({success: false, err})
    
    return res.status(200).send({ success: true })
  })
})

/**
 * File upload  route
 * '/api/users/uploadimage'
 * POST
 */
router.post("/uploadimage", auth, adminAuth, (req, res)=>{
  var form = new formidable.IncomingForm()
  //parse the incoming form input by formidable
  form.parse(req, (err, fields, files) => {
    if(err) return res.status(400).send(err)
    //upload file to cloudinary
    cloudinary.v2.uploader.upload(
      files.picfile.path, //the file path from tmp folder
      {
        public_id: `${Date.now()}`, 
        resource_type: 'image',
        },
      function(error, result) {
        if(error) return res.status(400).send(error)
        //send response
        res.status(200).send({
          public_id: result.public_id,
          url: result.url
        })
      });
    
  })
  
})
/**
 * remove uploaded image
 * '/api/users/removeimage?public_id=3985095890'
 * GET
 */
router.get("/removeimage", auth, adminAuth, (req, res)=>{
  let image_id = req.query.public_id;
  
  cloudinary.v2.uploader.destroy(
    image_id, //file to be deleted
    function(error, result) {
      if(error) return res.status(400).send(error)
      //send response
      res.status(200).send({
        success: true
      })
    });
 
  
})

module.exports = router;