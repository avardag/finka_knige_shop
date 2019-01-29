const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
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

/**
 * gets the product by id from query string
 * can be one id or many ids
 * ids separated by commas, at the end type is specified(single/array)
 *  /api/products/articles/id?id=kfhhihf39080923jd9082,skffn989489msn&type=array
 * GET
 * @return array of product objects
 */
router.get("/articles/id", (req, res)=>{
  let type = req.query.type;
  let items = req.query.id;
  if(type === 'array'){
    let ids = req.query.id.split(","); //array of ids
    items= []; //reassign items to be an array
    items = ids.map(item=> mongoose.Types.ObjectId(item)) //items now is array of mongoose objectIds
    
  }
  Product
    .find({"_id": {$in:items}})
    .populate("brand")
    .populate("style")
    .exec((err, docs)=>{
      if(err) return res.status(400).send(err)
      return res.status(200).send(docs);
    }) 

})

/**
 * gets products from db sorted by sold or arrival date
 * /api/products/articles?sortBy=sold&order=desc&limit=4
 * /api/products/articles?sortBy=createdAt&order=desc&limit=4
 * GET
 * @return array of product objects
 */
router.get("/articles", (req, res)=>{
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100; 
  //query string are strings, need to pass number to mogoose queries

  Product
    .find()
    .populate("brand")
    .populate("style")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles)=>{
      if(err) return res.status(400).send(err)
      return res.status(200).send(articles);
    }) 
})

/**
 * gets products from db to Shop component
 * /api/products/shop
 * POST
 * @return array of product objects
 */
router.post("/shop", (req, res)=>{
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
  let skip = parseInt(req.body.skip);
  //query string are strings, need to pass number to mogoose queries
  // //req.body.filters key will be : 
  //    {
  //      bladeLength: [0, 70],
  //      brand: ["5c30524aad9121270a32a2cc","5c305546395b9c288a92771c","5c3057e5e4b50929642280cf"],
  //      price:[30, 49],
  //      style:["5c30524aad9121270a32a2cc","5c305546395b9c288a92771c"]
  //    }
  let findArgs = {}; //arguments to Mongo find query

  for (const key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if(key === 'price' || key==='bladeLength'){ 
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      }else{
        findArgs[key] = req.body.filters[key]
      } 
    }
  }
  Product
    .find(findArgs)
    .populate("brand")
    .populate("style")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles)=>{
      if(err) return res.status(400).send(err)
      return res.status(200).json({
        size: articles.length,
        articles
      });
    }) 

  res.status(200)
})
module.exports = router;