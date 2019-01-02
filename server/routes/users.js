const express = require('express');
const router = express.Router();

//model imports
const User = require("../models/user");

/**
 * /api/users/register
 * POST
 * 
 */
router.get("/register", (req, res)=>{
  res.status(200).json({msg: 'success'});
})

router.post("/register", (req, res)=>{
  const newUser = new User(req.body);
  
  newUser.save((err, doc)=>{
    console.log('doc', doc);
    if(err) return res.json({success: false, err})
    //no error, proceed
    res.status(200).json({
      success: true,
      userData: doc
    })
  })
})



module.exports = router;