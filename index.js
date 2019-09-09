// nodeBlog - a demonstration Blog app using Node, Express, EJS and MongoDB based on example by Greg Lim
// M. Allen - 2019

// initialisation
const express = require('express')
const app = new express()
const path = require('path')

app.use(express.static('public'))

// set up Routing
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})
app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})
app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

// serve
app.listen(4000, () => {
    console.log("Listening on port 4000")
})

