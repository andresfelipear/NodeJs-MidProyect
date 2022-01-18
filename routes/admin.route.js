const router = require('express').Router()

const adminController = require('../controllers/admin.controller')

//admins

router.get('/', adminController.getPosts)


module.exports = router