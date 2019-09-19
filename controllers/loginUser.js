// authenticate user - controller

const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const {username, password} = req.body

    User.findOne({username:username}, (error, user) => {
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors',validationErrors)
            req.flash('data', req.body)
            return res.redirect('/auth/login')
        } else if (user) {     // user exists
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {     // password match
                    req.session.userId = user._id
                    loggedInUsername = username
                    res.redirect('/')
                }
                else {          // passwords don't match
                    res.redirect('/auth/login')
                }
            })
        }
    })
}