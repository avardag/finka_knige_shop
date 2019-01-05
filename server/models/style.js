const mongoose = require("mongoose");

const styleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
    maxLength: 64
  }
})

const Style = mongoose.model("Style", styleSchema);

module.exports = Style;