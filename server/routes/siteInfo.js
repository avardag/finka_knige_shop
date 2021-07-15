const express = require("express");
const router = express.Router();

//MWare import
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

//model imports
const Site = require("../models/site");

//==================================
// Site Info
//==================================
//TODO: fix site info route to post new featured products
// /**
//  * post site info (to be used once)
//  * GET
//  * /api/site/setsite
//  */
// router.get("/setsite", (req, res) => {
//   // Site.remove({}, (err, doc) => {
//   //   if (err) return res.status(400).send(err);
//   //   res.status(200).json({ deleted: true });
//   // });
//   const siteData = {
//     name: "Site",
//     featured: [
//       {
//         knife_name: "Cold Steel folding knives",
//         promotion_text: "New Arrival of Cold Steel knives",
//         image_url:
//           "http://res.cloudinary.com/micober/image/upload/v1626311606/1626311605320.jpg",
//         link: "/shop",
//         button_text: "Shop now",
//       },
//       {
//         knife_name: "Swiss Army knife",
//         promotion_text: "15% off on Swiss Army knives",
//         image_url:
//           "http://res.cloudinary.com/micober/image/upload/v1626306143/1626306142295.jpg",
//         link: "/shop",
//         button_text: "View offers",
//       },
//       {
//         knife_name: "Multitools",
//         promotion_text: "Quality multitools",
//         image_url:
//           "http://res.cloudinary.com/micober/image/upload/v1626301556/1626301556059.jpg",
//         link: "/shop",
//         button_text: "Shop now",
//       },
//     ],
//     siteInfo: [
//       {
//         address: "1516 Zeid Str",
//         phone: "+43-7-8162222",
//         hours: "Mon-Fri/ 9:00-18:00",
//         siteEmail: "finka-knives@gmail.com",
//       },
//     ],
//   };
//   Site.create(siteData).then((err, doc) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).send(doc);
//   });
// });

//TODO: make a new route to GET featured products
/**
 * get site info
 * GET
 * /api/site/site_info
 */
router.get("/site_info", (req, res) => {
  Site.find({}, (err, doc) => {
    if (err) return res.status(400).send(err);
    //send siteinfo field of Site model
    res.status(200).send(doc[0]);
  });
});

/**
 * update site info
 * POST
 * /api/site/site_info
 */
router.post("/site_info", auth, adminAuth, (req, res) => {
  Site.findOneAndUpdate(
    { name: "Site" },
    { $set: { siteInfo: req.body } },
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      //send siteinfo field of Site model
      return res.status(200).send({
        success: true,
        siteInfo: doc.siteInfo,
      });
    }
  );
});

module.exports = router;
