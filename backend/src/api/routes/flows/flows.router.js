const express = require('express')
const flowsRouter = express.Router()
const passport = require('../../../configs/passport.config')

const { getAllFlows, createFlow } = require('./flows.controller')
const tasksRouter = require('./tasks/tasks.router')

flowsRouter.get('/', passport.authenticate('jwt', { session: false }), getAllFlows)
flowsRouter.post('/', passport.authenticate('jwt', { session: false }), createFlow)
flowsRouter.use('/tasks', tasksRouter)

module.exports = flowsRouter
