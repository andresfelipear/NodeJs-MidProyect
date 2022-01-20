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

module.exports = router

