// allow logged in user to access view - middleware

const User = require('../models/User')

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        if (user) console.log(user.username)
        if (error || !user) {
            return res.redirect('/')
        }
        next()
    })
}