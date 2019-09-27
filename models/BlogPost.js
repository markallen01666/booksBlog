// Blogpost database schema

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const BlogPostSchema = new Schema({
  title: String,
  subtitle: String,
  author: String,
  body: String,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: String,
  datePosted:{ 
    type: Date,
    default: new Date()
  }
});

const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
module.exports = BlogPost