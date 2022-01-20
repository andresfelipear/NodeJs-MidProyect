const User = require('../models/user.model')
const bcrypt = require('bcrypt')

//Login (get, post)

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        titlePage: 'User Login',
        errMsg:'',
        session:false
    })
}

exports.postLogin = (req, res, next) => {
    const {username, password} = req.body

    User.findOne({username:username}, (err, user)=>{
        if(err) console.log(err)

        if(!user){
            res.render('auth/login',{
                titlePage:'User Login',
                errMsg:'The username or password that you entered is incorrect. Use a valid credential and try again'
            })
        }

        bcrypt.compare(password, user.password).then((isMatching)=>{
            if(isMatching){
                req.session.user = user
                req.session.isLoggedIn = true
                return req.session.save(err=>{
                    if(err) console.log(err);
                    res.redirect('/')
                })
            }
            res.render('auth/login',{
                titlePage:'User Login',
                errMsg:'The username or password that you entered is incorrect. Use a valid credential and try again'
            })
        }).catch(err=>{
            console.log(err);
        })
    })

}


//Sign Up (get, post)

exports.getSignUp = (req, res, next) => {
    res.render('auth/signup', {
        titlePage: 'User Sign Up',
        errMsg:'',
        isLoggedIn:false
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

exports.postLogout = (req,res,next) => {
    req.session.destroy(err => {
        if(err) console.log(err)
        res.redirect('/')
    })
}

