// nodeBlog - a demonstration Blog app using Node, Express, EJS and MongoDB based on example by Greg Lim
// M. Allen - 2019

// initialisation
const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')

app.use(express.static('public'))
app.set('view engine', 'ejs')

// set up Routing
app.get('/', (req, res) => {
    res.render('index')
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

// serve
app.listen(4000, () => {
    console.log("Listening on port 4000")
})

