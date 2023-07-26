const express = require('express')
const flowsRouter = express.Router()
const passport = require('../../../configs/passport.config')
const upload = require("../../../configs/s3.config")

const { getAllFlows, createFlow, createDataset } = require('./flows.controller')
const tasksRouter = require('./tasks/tasks.router')

flowsRouter.get('/', passport.authenticate('jwt', { session: false }), getAllFlows)
flowsRouter.post('/', passport.authenticate('jwt', { session: false }), createFlow)
flowsRouter.post('/dataset', upload.single('dataset'), createDataset) // add auth later

flowsRouter.use('/tasks', tasksRouter)

module.exports = flowsRouter
