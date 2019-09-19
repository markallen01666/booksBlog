// authenticate user - controller

const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const {username, password} = req.body

    User.findOne({username:username}, (error, user) => {
        if (user) {     // user exists
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
        else {          // user does not exist
            res.redirect('/auth/login')
        }
    })
}