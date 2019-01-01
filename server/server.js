require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

// mongoDB setup
mongoose.Promise = global.Promise;
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true }, ()=>console.log("connected"))

//BodyParser settings
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

// server
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Server running on port ${port}`));