const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const User = require('../models/userModel')

const registerAdmin = asyncHandler(async(req,res)=>{
    const {name, email , password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }

    //check if admin exists
    const adminExists = await Admin.findOne({email})
    if(adminExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create admin
    const admin = await Admin.create({
        name, 
        email,
        password : hashedPassword
    })
    
    if(admin){
        res.status(201).json({
            _id : admin.id,
            name: admin.name,
            email : admin.email,
            token: generateToken(admin._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid admin data')
    }
})

const adminLogin = asyncHandler(async(req,res)=>{
    console.log("Inside");
    const {email , password} = req.body
    console.log(req.body);
    const admin = await Admin.findOne({email})
    console.log("admin",admin);
    if(admin && (await bcrypt.compare(password,admin.password))){
        res.json({
            _id: admin.id,
            name: admin.name,
            email : admin.email,
            token : generateToken(admin._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid admin data')
    }
})

const getUserData = asyncHandler(async(req,res)=>{
    const userData = await User.find()
    if(userData){
        res.status(200).json(userData)
    }else{
        res.status(400).json('no data')
    }
})

const editUser = asyncHandler(async(req,res)=>{
    try {
        const userId = req.body.userId
        const { body } = req
        const updatedUser = await User.findByTdAndUpdate(userId, body, {
            new: true,
        })

        const user = await User.find()
        if(!user){
            res.status(404).json({ message: "User not found" })
            return
        }else{
            res.status(200).json({ user })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'})
    }
}) 

const userBlock = asyncHandler(async(req,res)=>{
    try {
        const userId = req.body.userId
        const user = await User.findById(userId)
        if(!user){
            res.status(400)
            throw new Error("USer not found")
        }
        user.isBlocked = !user.isBlocked
        await user.save()
        const users = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'})
    }
})

const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: "30d"
    })
}

module.exports = {
    registerAdmin,
    adminLogin,
    getUserData,
    editUser,
    userBlock,

}