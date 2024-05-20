const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')

router.route('/register').post( adminController.registerAdmin)
router.route('/login').post(adminController.adminLogin)
router.get('/getUser', adminController.getUserData)
router.put('/editUser', adminController.editUser)
router.post('/userBlock',adminController.userBlock)
router.post('/addUser',adminController.createUser)

module.exports = router