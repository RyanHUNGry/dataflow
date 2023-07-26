require('dotenv').config()
require('aws-sdk/lib/maintenance_mode_message').suppress = true // Suppress SDK migration warning

const http = require('http')
const app = require('./app')
const { testDbConnection, db } = require('../db/db')

const startServer = async (db) => {
    await testDbConnection(db)
    const server = http.createServer(app)
    const PORT = process.env.DEV_PORT || 8000

    server.listen(PORT, () => {
        console.log(`✅ Server activated on ${PORT}`)
    })
}

startServer(db)