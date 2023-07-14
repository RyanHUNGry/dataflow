const express = require('express')
const tasksRouter = express.Router()
const passport = require('../../../../configs/passport.config')
const { createTask } = require('./tasks.controller')

tasksRouter.post('/', passport.authenticate('jwt', { session: false }), createTask)

module.exports = tasksRouter
