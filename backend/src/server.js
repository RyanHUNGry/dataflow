require('dotenv').config()

const http = require('http')
const app = require('./api/app')

const server = http.createServer(app)
const PORT = process.env.port || 8000

server.listen(PORT, () => {
    console.log(`Serving listening on port ${PORT}`)
})