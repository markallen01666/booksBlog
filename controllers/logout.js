// logout user - controller

module.exports = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}