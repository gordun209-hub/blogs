const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require("../models/user");

usersRouter.post('/', async(req,res)=>{
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password,saltRounds)

    const user = new User({
        username:body.username,
        name:body.name,
        passwordHash
    })
    const savedUser = await user.save()
    res.json(savedUser)
})

usersRouter.get('/', async(req,res)=>{
    const users = await User.find({}).populate('blogs',{url:1,author:1,title:1})
    res.json(users.map(u=>u.toJSON()))
})

module.exports=usersRouter
