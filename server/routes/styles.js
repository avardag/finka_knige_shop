const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
//model imports
const Style = require("../models/style");


/**
 * /api/product/style
 * POST
 */
router.post("/style", auth, adminAuth, (req, res)=>{
  //create a new brand using brand model
  const style = new Style(req.body);

  style.save((err, doc)=>{
    if(err) return res.json({success: false, err})
    res.status(200).json({
      success: true,
      style: doc
    })
  })
})
/**
 * gets all the styles from db
 * /api/product/styles
 * GET
 * @return array of style objects
 */
router.get("/styles", (req, res)=>{
  Style.find({}, (err, styles)=>{
    if(err) return res.status(400).send(err)

    res.status(200).send(styles);
  })
})

module.exports = router;