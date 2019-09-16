const BlogPost = require("../models/BlogPost.js");

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({
    $or: [
      { title: { $regex: req.body.title, $options: "i" } },
      { author: { $regex: req.body.title, $options: "i" } }
    ]
  });
  res.render("search", {
    blogposts
  });
};
