const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const getRegister = asyncHandler(async(req,res)=>{{
    res.status(200).json({message : 'Register User'})
}})

const postRegister = asyncHandler(async(req,res) => {{
    const { name, email , password } = req.body
    console.log(req.body);

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all the fields')
    }

    //check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User Already Exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password : hashedPassword,
        
    })
    
    if(user){
        res.status(201).json({
            _id : user.id,
            name: user.name,
            email : user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
}})

const getLogin = asyncHandler(async(req,res)=>{{
    res.status(200).json({message:'Register user'})
}})

const postLogin = asyncHandler(async(req,res) => {{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
}})


const getUser = asyncHandler(async(req,res) => {
    const {name,email,image} = req.body
    const user = await User.findById(req.user.id)

    if(!user){
        return res.status(400).json({ message: 'User not found' })
    }

    user.name = name || user.name
    user.email = email || user.email
    user.image = image || user.image

    const updatedUser = await user.save()

    res.status(200).json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image
    })
})

//generate JWT
const generateToken = (id) =>{
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn : '30d',
    })
}

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getUser
}