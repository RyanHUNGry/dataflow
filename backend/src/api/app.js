const express = require('express')
const morgan = require('morgan')

const flowsRouter = require('./routes/flows/flows.router')

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use('/flows', flowsRouter)

app.get('/', (req, res) => {
    res.status(200).send("HOME PAGE")
})

module.exports = app