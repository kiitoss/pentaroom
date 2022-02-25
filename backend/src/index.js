require('dotenv').config()

const PORT = process.env.PORT || 8080

const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: true,
  origins: ['*', '*:*', 'http://pentaroomio.jkhq4735.odns.fr', 'http://pentaroomio.jkhq4735.odns.fr:*'],
})

const SocketIOManager = require('./SocketIOManager')

const socketManager = new SocketIOManager(io)

socketManager.init()

// open the server
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
