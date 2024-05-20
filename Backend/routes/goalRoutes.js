const express = require('express')
const router = express.Router()
const {getGoals,postGoals,updateGoals,deleteGoals} = require('../controller/goalController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect,getGoals).post(protect,postGoals)
router.route('/:id').delete(protect,deleteGoals).put(protect,updateGoals)

module.exports = router