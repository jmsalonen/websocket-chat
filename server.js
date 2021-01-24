const express = require('express')
const websocket = require('ws')
const app = express()
const wsServer = new websocket.Server({ noServer: true })
const PORT = 3000

app.use(express.static('client'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let id = 0

wsServer.on('connection', socket => {
  console.log('new client connected')
  socket.user = { id: id++, name: 'quest' }
  
  socket.on('message', message => {
    const data = JSON.parse(message)
    if (data.type == 'name') {
      console.log(`  set name: ${data.name}`)
      socket.user.name = data.name
    }
    else if (data.type == 'message') {
      console.log(`  message everyone: ID:${socket.user.id} ${socket.user.name}: ${data.message}`)
      wsServer.clients.forEach(client => client.send(`<strong>${socket.user.name}</strong>: ${data.message}`))
    }
  })
})

const server = app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`)
})

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request)
  })
})

