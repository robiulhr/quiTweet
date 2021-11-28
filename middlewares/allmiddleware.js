class allmiddlewares {
    // checking the user logedin or not 
    static loginrequired(req, res, next) {
        if (req.session && req.session.Logedinuser) {
            next()
        } else {
            res.redirect('/login')
        }
    }
    // when user is logedin
    static userLogedin(req, res, next) {
        if (req.session && req.session.Logedinuser) {
            res.redirect('/')
        } else {
            next()
        }
    }
}

module.exports = allmiddlewares