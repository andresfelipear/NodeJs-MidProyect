const User = require('../models/user.model')
const bcrypt = require('bcrypt')

//Login (get, post)

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        titlePage: 'User Login',
    })
}

// exports.postLogin = (req, res, next) => {
//     const {username, password} = req.body

// }


//Sign Up (get, post)

exports.getSignUp = (req, res, next) => {
    res.render('auth/signup', {
        titlePage: 'User Sign Up',
        errMsg:''
    })
}

exports.postSignUp = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body
    if (password === confirmPassword) {
        if (User.exists({ username: username })) {
            res.render('auth/signup', {
                titlePage: 'User Sign Up',
                errMsg: 'The username exists, Try login or use another username'
            })
        }
        else {
            if (User.exists({ email: email })) {
                res.render('auth/signup', {
                    titlePage: 'User Sign Up',
                    errMsg: 'The email exists, Try login or use another email'
                })
            }
            else {
                await bcrypt.hash(password, 12).then((hashedPasssword) => {
                    const user = new User({
                        username: username,
                        email: email,
                        password: hashedPasssword,
                        posts: {}
                    })
                    return user.save()

                }).then(() => {
                    res.redirect('/login')
                }).catch(err => {
                    console.log(err)
                })
            }


        }


    }
    else {
        res.render('auth/signup', {
            titlePage: 'User Sign Up',
            errMsg: 'The confirm password does not match.. try again!!'
        })
    }

}

