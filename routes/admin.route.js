const router = require('express').Router()

const adminController = require('../controllers/admin.controller')

//admins

router.get('/', adminController.getAllPosts)

router.get('/add-post', adminController.getAddEditPost)
router.post('/add-post',adminController.postAddEditPost )

//edit, delete posts
router.get('/edit-post/:postId', adminController.getEditPost)
router.post('/edit-post', adminController.postEditPost)

router.post('/delete-post', adminController.postDeletePost)

//like post
router.post('/like-post', adminController.postLikePost)

//add comment post
router.post('/add-comment-post', adminController.postAddComentPost)

module.exports = router

