import express from 'express'
const app = express()
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'

app.use(cors()) // Add cors middleware

const server = http.createServer(app) // Add this
const PORT = process.env.PORT ?? 4000

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

const users: any[] = []
const messages = [
  { author: 'author1', text: 'text1' },
  { author: 'author2', text: 'text2' },
]

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`)

  socket.on('join', (nickname) => {
    users.push({ id: socket.id, nickname, isTyping: false })
    io.emit('update_user_list', users)
    io.emit('update_messages', messages)
  })

  socket.on('typing', () => {
    if (users[users.findIndex((user) => user.id === socket.id)]) {
      users[users.findIndex((user) => user.id === socket.id)].isTyping = true
      io.emit('update_user_list', users)
    }
  })

  socket.on('stopped_typing', () => {
    if (users[users.findIndex((user) => user.id === socket.id)]) {
      users[users.findIndex((user) => user.id === socket.id)].isTyping = false
      io.emit('update_user_list', users)
    }
  })

  socket.on('send_chat_message', (data) => {
    messages.push({ author: data.nickname, text: data.text })

    io.emit('update_messages', messages)
  })

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from the chat`)
    users.splice(
      users.findIndex((user) => user.id === socket.id),
      1,
    )
    io.emit('update_user_list', users)
  })
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
