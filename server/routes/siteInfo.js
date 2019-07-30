const express = require('express');
const router = express.Router();

//MWare import
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

//model imports
const Site = require("../models/site");



//==================================
// Site Info
//==================================
// /**
//  * post site info (to be used once)
//  * GET
//  * /api/site/setsite
//  */
// router.post("/setsite", auth, (req, res)=>{

//   const siteData = {
//     featured: [],
//     siteInfo: [
//       {
//         address: '1516 Wintergatan',
//         phone: '+43-7-8162222',
//         hours: 'Mon-Fri/ 9:00-18:00',
//         siteEmail: 'info@finka-knives.com'
//       }
//     ]
//   };
//   Site.create(siteData)
//     .then((err, doc)=>{
//       if(err) return res.status(400).send(err)
//       res.status(200).send(doc)
//     })
// })

/**
 * get site info
 * GET
 * /api/site/site_info
 */
router.get("/site_info", (req, res)=>{

  Site.find({}, (err, doc)=>{
    
    //send siteinfo field of Site model
    res.status(200).send(doc[0].siteInfo)
  });
})


module.exports = router;