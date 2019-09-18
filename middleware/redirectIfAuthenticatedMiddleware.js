// stop logged in user accessing view - middleware

module.exports = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/')        // if user logged in, redirect to home page
    }
    next()
}