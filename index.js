// booksBlog - a demonstration Blog app using Node, Express, EJS, MongoDB and Mongoose based on example by Greg Lim
// M. Allen - 2019

// imports
const express = require("express");
const app = new express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost.js");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const flash = require('connect-flash')

//controllers
const newPostController = require("./controllers/newPost");
const saveNewPostController = require("./controllers/saveNewPost");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const singlePostController = require("./controllers/singlePost");
const homeController = require("./controllers/home");
const searchStartController = require("./controllers/searchStart");
const searchPostsController = require("./controllers/searchPosts");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUsercontroller = require("./controllers/loginUser");
const logoutController = require("./controllers/logout")

// validation middleware
const validationMiddleWare = require("./middleware/validationMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

// connect database and register middleware
mongoose.connect("mongodb+srv://53ptolemy8607:n6SkRDlbTED6kPZN@cluster0-wvhp3.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static("public"));
app.use(
  expressSession({
    secret: "exemption tread fiction" // secret string of three random words from randomwordgenerator.com
  })
);
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

// globals
global.loggedIn = null;   // user is not logged in
global.loggedInUsername = "";   // logged in user's name

// add logged in status to requests
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

// flushing
app.use(flash());

// Route behaviour
app.get("/", homeController);
app.get("/search", searchStartController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/post/:id", singlePostController);
app.get("/posts/new", authMiddleware, newPostController);
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.get("/auth/logout", logoutController)
app.post("/posts/store", authMiddleware, saveNewPostController);
app.post("/search", searchPostsController);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUsercontroller
);
app.use((req, res) => {
  res.render('404')
})

// serve
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
