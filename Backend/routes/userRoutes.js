const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')


router.route('/register').get(userController.getRegister).post(userController.postRegister)
router.route('/login').get(userController.getLogin).post(userController.postLogin)
router.put('/user', protect ,userController.getUser)


module.exports = router