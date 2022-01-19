//Login (get, post)

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        titlePage: 'User Login',
    })
}


//Sign Up (get, post)

exports.getSignUp = (req, res, next) => {
    res.render('auth/signup', {
        titlePage: 'User Sign Up',
    })
}

