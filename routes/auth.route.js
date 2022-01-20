const router = require('express').Router()

const authController = require('../controllers/auth.controller')

//admins

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

router.get('/signup', authController.getSignUp)
router.post('/signup', authController.postSignUp)

router.post('/logout', authController.postLogout)

router.get('/', authController.getUserPosts)

//post details
router.get('/posts/:postId', authController.getPostById)


//like post
router.post('/like-post', authController.postLikePost)

//add comment post
router.post('/add-comment-post', authController.postAddComentPost)
module.exports = router