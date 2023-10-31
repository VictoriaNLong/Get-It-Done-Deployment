const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const createError = require('../utils/createError')

const register = async(req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return next(
            createError({
                message: 'Name, Email, and password required'
            })
        )
    }

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        await newUser.save()
        return res.status(201).json('Created New User')
    } catch (err) {
        return next(err);
      }
    }

const login = async(req, res) => {
    if(!req.body.email || !req.body.password){
        return next(
            createError({
              message: 'Email and password are required',
              statusCode: 400,
            }),
          );
    }
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(404).json("no user found")
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password)
        if(!correctPassword){
            return res.json('incorrect password')
        }
        const payload = {
            id: user._id,
            name: user.name
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })
        return res
        .cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({name: user.name, email: user.email, message: "login successful"})
    }catch (err) {
        res.status(500).json(err);
      }
}

const logout = (req, res) => {
    res.clearCookie('access_token')
    return res.status(200).json({message: 'Logged out'})

}

const isLoggedIn = (req, res) => {
const token = req.cookies.access_token
if(!token){
    return res.json(false)
}
return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if(err){
        return res.json(false)
    }else{
        return res.json(true)
    }
})
}

module.exports = {register, login, logout, isLoggedIn}
