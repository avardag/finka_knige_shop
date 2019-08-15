const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary");
const formidable = require('formidable'); //for managing file uploads
const mongoose = require("mongoose");
const async = require('async');
const moment = require("moment");

//Util to send emails with nodemailer
const sendEmail = require("../utils/mail")
//MWare import
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

//model imports
const User = require("../models/user");
const Product = require("../models/product")
const Payment = require("../models/payment")

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
    //send welcome email
    sendEmail(doc.email, doc.name, null, "welcome")
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

///////////////////////////
// USER SHOPPING CART
///////////////////////////
/**
 * add item to user cart
 * '/api/users/addtocart?productId=90832984980998
 * POST
 */
router.post('/addtocart', auth, (req, res)=>{
  //find user
  User.findOne({_id: req.user._id}, (err, foundUser)=>{
    //check if product being added is a duplicate(i.e. already exists in cart)
    let duplicate = false;
    foundUser.cart.forEach(item=>{
      if(item.id == req.query.productId){ //if item exists in users cart
        duplicate = true //change duplicate to true
      }
    })

    if(duplicate){
      //product is already in users cart
      User. findOneAndUpdate(
        //find user & find which cart obj is to be updated from cart array
        {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
        //increment quantity by 1
        {$inc: {"cart.$.quantity": 1}},
        {new: true},
        (error, foundAndUpdatedUser) =>{
          if(error) return res.status(400).json({success: false, error})
          res.status(200).json(foundAndUpdatedUser.cart)
        }
      )

    }else{
      //nt a duplicate. A new product to cart
      User.findOneAndUpdate(
        {_id: req.user._id},
        {$push: { cart: //push to users cart below object
          { 
            id: mongoose.Types.ObjectId(req.query.productId),
            quantity: 1,
            addedDate: Date.now()
          }
        }},
        {new: true}, //return whole doc
        (error, foundAndUpdatedUser) =>{
          if(error) return res.status(400).json({success: false, error})
          res.status(200).json(foundAndUpdatedUser.cart)
        }
        )
    }

  })
})

/**
 * remove item from user cart
 * '/api/users/removefromcart?productId=90832984980998
 * GET
 */
router.get("/removefromcart", auth, (req, res)=>{
  //find user to update
  User.findOneAndUpdate(
    {_id: req.user._id},
    {"$pull": //pull, i.e. remove
      {"cart": //from cart array
        {"id": mongoose.Types.ObjectId(req.query.productId)}
      }
    },
    {new: true}, //return new state of model
    (err, foundUser)=>{
      let cart = foundUser.cart;
      let productsInCart = cart.map(item=>{
        return mongoose.Types.ObjectId(item.id)
      });
      //find all products with matching ids in productsInCart
      Product.find({"_id": { $in: productsInCart }})
            .populate("brand")
            .populate("style")
            .exec((err, foundProducts)=>{
              return res.status(200).json({
                cartDetail: foundProducts,
                cart: cart
              })
            })
    }
  )
})

/** 
 * Updates users history of purchases, empties users cart, increments all
 * products in users cart "sold" value. Stores payment details in Payment model of DB
 * 
 * Success buy route
 * POST
 * /api/users/successbuy
 */
router.post("/successbuy", auth, (req, res)=>{
  let history = [];
  let transactionData ={};//got from paypal
  
  //update user history. history field in user model is array
  req.body.userCartDetail.forEach((item)=>{
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      brand: item.brand,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentID: req.body.paymentData.paymentID
    })
  })

  //store payment info in Payments Dash. needs new db model
  transactionData.user = {
    id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  }
  transactionData.data= req.body.paymentData; //info from paypal transaction
  transactionData.products = history;
  
  //Find user by id too update
  User.findOneAndUpdate(
    { _id: req.user._id },
    //push to users history array. And erase user's cart, set to empty array
    { $push: { history: history }, $set: { cart: [] }}, 
    //return new updated user
    { new: true},
    (err, foundAndUpdatedUser)=>{
      if (err) res.json({success: false, err})
      //create paymet instance and save to db
      const payment = new Payment(transactionData);
      payment.save((err, savedPaymentDoc)=>{
        if (err) res.json({success: false, err})
        //create paymentArray to loop
        let produtsArray = [];
        savedPaymentDoc.products.forEach((item)=>{
          produtsArray.push( {id: item.id, quantity: item.quantity} )
        })
        
        //use nodes async lib to loop over async looping, and to return single
        //=> callback when all async stuff is done
        async.eachSeries(produtsArray, (item, callbackWhenDone)=>{
          Product.update(
            {_id: item.id},
            { $inc: { "sold": item.quantity } },
            {new: false},
            callbackWhenDone
          )
        }, (err)=>{ // this is callbackWhenDone
          if (err) res.json({success: false, err})
          res.status(200).json({
            success: true,
            cart: foundAndUpdatedUser.cart, //will be empty
            cartDetail: []
          })
        })
      })
    }
  )

})

/**
 * update user info
 * POST
 * /api/users/update-profile
 */
router.post("/update-profile", auth, (req, res)=>{

  User.findOneAndUpdate(
    {_id: req.user._id},
    { $set: req.body },
    { new: true },
    (err, doc)=>{
      if(err) res.json({success: false, err})

      return res.status(200).send({ success: true })
    }
  )
})

/** ==============
 RESET USER PASSwORD
 ================*/

/**
 * send user reset password link
 * POST
 * /api/users/reset-user
 */
router.post("/reset-user", (req, res)=>{

  User.findOne(
    {email: req.body.email},
    (err, user)=>{
      if(err) res.json({success: false, err})
      if(user){
        user.generateResetToken((err, user)=>{  
          if(err) res.json({success: false, err})
          //send email to user
          sendEmail(user.email, user.firstName, null, "reset_pass", user);
  
          return res.status(200).send({ success: true })
        })
      }else{
        res.json({success: false})
      }
    }
  )
})

/**
 * reset users password found by his reset token
 * POST
 * /api/users/reset-password
 */
router.post("/reset-password", (req, res)=>{

  let today = moment().startOf("day").valueOf(); // -> 1565647200000

  User.findOne(
    {
      resetToken: req.body.resetToken,
      resetTokenExpire: {
        $gte: today
      }
    },
    (err, user)=>{
      if(err) res.json({success: false, err})
      if(user){
        user.password = req.body.password;
        user.resetToken = '';
        user.resetTokenExpire = '';
        //save user's new info(password) and delete token
        user.save((err, doc)=>{
          if(err) res.json({success: false, err})
          return res.status(200).json({success: true})
        })

      }else{
        res.json({success: false, message: 'Sorry bad token, generate new one'})
      }
    }
  )
})

module.exports = router;