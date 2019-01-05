const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
//model imports
const Product = require("../models/product");


/**
 * /api/products/article
 * POST
 */
router.post("/article", auth, adminAuth, (req, res)=>{
  //create a new product article using product model
  const product = new Product(req.body);

  product.save((err, doc)=>{
    if(err) return res.json({success: false, err})
    res.status(200).json({
      success: true,
      article: doc
    })
  })
})
// /**
//  * gets all the brands from db
//  * /api/products/articles
//  * GET
//  * @return array of product objects
//  */
// router.get("/articles", (req, res)=>{
//   Product.find({}, (err, products)=>{
//     if(err) return res.status(400).send(err)

//     res.status(200).send(products);
//   })
// })

module.exports = router;