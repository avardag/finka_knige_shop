const mongoose = require("mongoose")

const siteSchema = mongoose.Schema({
  name: String, //to be used to find doc
  featured:{
    required: true,
    type: Array,
    default: []
  },
  siteInfo:{
    required: true,
    type: Array,
    default: []
  },
})

const Site = mongoose.model("Site", siteSchema)

module.exports = Site;