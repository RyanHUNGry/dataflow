const express = require('express')
const usersRouter = express.Router()

const {getAllUsers, createUser } = require('./users.controller')

usersRouter.get('/', getAllUsers)
usersRouter.post('/', createUser)

module.exports = usersRouter