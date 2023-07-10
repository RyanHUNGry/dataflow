const express = require('express')
const morgan = require('morgan')

const flowsRouter = require('./routes/flows/flows.router')
const usersRouter = require('./routes/users/users.router')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use(morgan('dev'))

app.use('/flows', flowsRouter)
app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.status(200).send("HOME PAGE")
})

module.exports = app