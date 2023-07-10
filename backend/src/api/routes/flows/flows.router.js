const express = require('express')
const flowsRouter = express.Router()

const { getAllFlows } = require('./flows.controller')

flowsRouter.get('/', getAllFlows)

module.exports = flowsRouter