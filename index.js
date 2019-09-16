// booksBlog - a demonstration Blog app using Node, Express, EJS, MongoDB and Mongoose based on example by Greg Lim
// M. Allen - 2019

// initialisation
const express = require("express");
const app = new express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost.js");
const fileUpload = require("express-fileupload");

//controllers
const newPostController = require("./controllers/newPost");
const saveNewPostController = require("./controllers/saveNewPost");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const singlePostController = require("./controllers/singlePost");
const homeController = require("./controllers/home");
const searchStartController = require("./controllers/searchStart");
const searchPostsController = require("./controllers/searchPosts");

// validation middleware
const validationMiddleWare = require("./middleware/validationMiddleware");

// connect database and register middleware
mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(fileUpload());
app.use("/posts/store", validationMiddleWare);

// set up Routing
app.set("view engine", "ejs");

app.get("/", homeController);
app.get("/search", searchStartController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/post/:id", singlePostController);
app.get("/posts/new", newPostController);
app.post("/posts/store", saveNewPostController);
app.post("/search", searchPostsController);

// serve
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
