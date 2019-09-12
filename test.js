// Testing CRUD operations on MongoDB database using Mongoose

const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

BlogPost.create({
    title: 'The new catalogue of historic buildings in Malmesbury',
    body: 'This guide catalogues the extensive list of recognised historic buildings and structures in the ancient bourough of Malmesbury, Wiltshire. From iron age fortifications to WW2 radar factories, the town has an enviable number of buildings linked to the national story.'
}, (error, blogpost) => {
    console.log(error, blogpost)
})