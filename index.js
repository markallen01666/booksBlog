// nodeBlog - a demonstration Blog app using Node, Express, EJS, MongoDB and Mongoose based on example by Greg Lim
// M. Allen - 2019

// initialisation
const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost.js')


mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')

// set up Routing
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/post', (req, res) => {
    res.render('post')
})
app.get('/posts/new', (req, res) => {
    res.render('create')
})
app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body) 
    res.redirect('/')
})

// serve
app.listen(4000, () => {
    console.log("Listening on port 4000")
})
