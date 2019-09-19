// logout user - controller

module.exports = (req, res) => {
    req.session.destroy(() => {
        loggedInUsername = ""
        res.redirect('/')
    })
}