const express = require('express')
const usersRouter = express.Router()
const passport = require('../../../configs/passport.config')

const { getAllUsers, signupUser, loginUser, refreshAccessToken, logoutUser } = require('./users.controller')

usersRouter.get('/', getAllUsers)

// Authentication routes
usersRouter.post('/signup', signupUser)
usersRouter.post('/login', loginUser)
usersRouter.delete('/logout', logoutUser)
usersRouter.post('/token', refreshAccessToken)

module.exports = usersRouter
