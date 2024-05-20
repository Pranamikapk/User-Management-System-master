const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')

router.route('/register').post( adminController.registerAdmin)
router.route('/login').post(adminController.adminLogin)
router.get('/getUser', adminController.getUserData)
router.put('/editUser', adminController.editUser)


module.exports = router