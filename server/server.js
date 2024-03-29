require("dotenv").config();
const path = require("path");
const express = require("express");
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
// mongoose
//   .connect(dbURI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Mongo DB connected"))
//   .catch((err) => console.log(err));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// //formidable for handling file uploads
// app.use(formidableMiddleware());

//BodyParser settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
//serve static files built by react
app.use(express.static("client/build"));

//cloudinary config for managing picture uploads
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//ROUTES
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/styles"));
app.use("/api/products", require("./routes/brands"));
app.use("/api/products", require("./routes/products"));
app.use("/api/site", require("./routes/siteInfo"));

// Default route for index page(SPA)
// if (process.env.NODE_ENV === "production") {
//   app.get("/*", (req, res) => {
//     //index.html built by react
//     res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }
if (process.env.NODE_ENV === "production") {
  console.log("production static");
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}
// server
const PORT = process.env.PORT || 5000;

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
});
