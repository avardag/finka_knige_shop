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
//   // Site.remove({}, (err, doc)=>{
//   //   if(err) return res.status(400).send(err)
//   //   res.status(200).json({deleted: true})
//   // })
//   const siteData = {
//     name: 'Site',
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
    if(err) return res.status(400).send(err)
    //send siteinfo field of Site model
    res.status(200).send(doc[0].siteInfo)
  });
})

/**
 * update site info
 * POST
 * /api/site/site_info
 */
router.post("/site_info", auth, adminAuth,  (req, res)=>{

  Site.findOneAndUpdate(
    {name: 'Site'},
    { '$set': { siteInfo: req.body } },
    {new: true},
    (err, doc)=>{
      if(err) return res.status(400).json({success: false, err})
      //send siteinfo field of Site model
      return res.status(200).send({
        success: true,
        siteInfo: doc.siteInfo
      })
  });
})


module.exports = router;