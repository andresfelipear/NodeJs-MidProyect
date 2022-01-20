const User = require('../models/user.model')
const Posts = require('../models/posts.model')
const bcrypt = require('bcrypt')

//User posts
exports.getUserPosts = (req, res,next)=>{
    Posts.find((err,posts)=>{
        if(err)console.log(err);
        res.render('admin/posts', {
            titlePage: `Posts`,
            session:req.session.hasOwnProperty('user')?req.session:false,
            errMsg:'',
            posts:posts
        })
    })
}


//Login (get, post)

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        titlePage: 'User Login',
        errMsg:'',
        session:req.session.hasOwnProperty('user')?req.session:false,
    })
}

exports.postLogin = (req, res, next) => {
    const {username, password} = req.body

    User.findOne({username:username}, (err, user)=>{
        if(err) console.log(err)

        if(!user){
            res.render('auth/login',{
                titlePage:'User Login',
                errMsg:'The username or password that you entered is incorrect. Use a valid credential and try again',
                session:req.session.hasOwnProperty('user')?req.session:false,
            })
        }

        bcrypt.compare(password, user.password).then((isMatching)=>{
            if(isMatching){
                req.session.user = user
                req.session.isLoggedIn = true
                return req.session.save(err=>{
                    if(err) console.log(err);
                    res.redirect('/admin')
                })
            }
            res.render('auth/login',{
                titlePage:'User Login',
                errMsg:'The username or password that you entered is incorrect. Use a valid credential and try again',
                session:req.session.hasOwnProperty('user')?req.session:false,
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
        session:req.session.hasOwnProperty('user')?req.session:false
    })
}

exports.postSignUp = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body
    if (password === confirmPassword) {
        if (await User.exists({ username: username })) {
            res.render('auth/signup', {
                titlePage: 'User Sign Up',
                errMsg: 'The username exists, Try login or use another username',
                session:req.session.hasOwnProperty('user')?req.session:false
            })
        }
        else {
            if (await User.exists({ email: email })) {
                res.render('auth/signup', {
                    titlePage: 'User Sign Up',
                    errMsg: 'The email exists, Try login or use another email',
                    session:req.session.hasOwnProperty('user')?req.session:false
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
            errMsg: 'The confirm password does not match.. try again!!',
            session:req.session.hasOwnProperty('user')?req.session:false
        })
    }

}

exports.postLogout = (req,res,next) => {
    req.session.destroy(err => {
        if(err) console.log(err)
        res.redirect('/')
    })
}

//Posts (details)
exports.getPostById = async(req,res,next)=>{
    const {
        params: { postId },
      } = req

      const post = await Posts.findById(postId)
      res.render('auth/post-details', {
        titlePage: post.title,
        errMsg: '',
        session:req.session.hasOwnProperty('user')?req.session:false,
        post:post
    })

    

    
}