const router = require('express').Router()

const adminController = require('../controllers/admin.controller')

//admins

router.get('/', adminController.getAllPosts)

router.get('/add-post', adminController.getAddEditPost)
router.post('/add-post',adminController.postAddEditPost )

module.exports = router

