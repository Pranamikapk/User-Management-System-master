const Goal = require('../models/goalModel')
const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async(req,res) =>{{
    const goal = await Goal.find({ user: req.user.id })
    console.log(req.user.id);
    res.status(200).json(goal)
}})

const postGoals = asyncHandler(async(req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text')
    }
    console.log(req.user.id);
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(201).json(goal)
})

const updateGoals = asyncHandler(async(req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    })
    res.status(200).json(updatedGoal)
})

const deleteGoals = asyncHandler(async(req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    if(!req.user){
        res.status(401)
        throw new Error('USer not found')
    }

    //Make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json ({id:req.params.id})
})

module.exports = {
    getGoals,
    postGoals,
    updateGoals,
    deleteGoals
}