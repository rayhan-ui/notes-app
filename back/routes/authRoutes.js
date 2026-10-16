const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

router.post('/signup', async(req, res)=>{
    try{
        const {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.json({message: "user created successfully"})
    }catch(err){
        res.json({message: err.message})
    }
})

router.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: "user not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "invalid credentials"})
        }

        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({
            token: token
        })
    }catch(err){
        res.json({message: err.message})
    }
})

module.exports = router