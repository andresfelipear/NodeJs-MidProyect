const router = require('express').Router()

const adminController = require('../controllers/admin.controller')

//admins

router.get('/', adminController.getAllPosts)

router.get('/add-post', adminController.getAddEditPost)
module.exports = router