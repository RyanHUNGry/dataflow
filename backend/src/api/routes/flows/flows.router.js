const express = require('express')
const flowsRouter = express.Router()

const {getFlows} = require('./flows.controller')

flowsRouter.get('/', getFlows)

module.exports = flowsRouter