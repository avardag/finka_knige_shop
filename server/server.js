require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const formidableMiddleware = require('express-formidable'); //for managing file uploads
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
//MWare import
// const auth = require("./middleware/auth");

const app = express();

// mongoDB setup
mongoose.Promise = global.Promise;
const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

// //formidable for handling file uploads
// app.use(formidableMiddleware());

//BodyParser settings
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

//cloudinary config for managing picture uploads
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})



//ROUTES
app.use("/api/users", require("./routes/users"))
app.use("/api/products", require("./routes/styles"));
app.use("/api/products", require("./routes/brands"));
app.use("/api/products", require("./routes/products"));

// server
const port = process.env.PORT || 3002;
app.listen(port, ()=>console.log(`Server running on port ${port}`));