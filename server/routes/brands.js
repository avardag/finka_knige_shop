const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
//model imports
const Brand = require("../models/brand");


/**
 * /api/product/brand
 * POST
 */
router.post("/brand", auth, adminAuth, (req, res)=>{
  //create a new brand using brand model
  const brand = new Brand(req.body);

  brand.save((err, doc)=>{
    if(err) return res.json({success: false, err})
    res.status(200).json({
      success: true,
      brand: doc
    })
  })
})
/**
 * gets all the brands from db
 * /api/product/brands
 * GET
 * @return array of brand objects
 */
router.get("/brands", (req, res)=>{
  Brand.find({}, (err, brands)=>{
    if(err) return res.status(400).send(err)

    res.status(200).send(brands);
  })
})

module.exports = router;