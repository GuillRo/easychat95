const path = require('path')
const port = process.env.PORT || 8080
const fs = require('fs')
const _ = require('lodash')

const express = require('express')
const app = express()
var http = require('http').createServer(app)
const io = require('socket.io')(http)

let usersRemaining = JSON.parse(fs.readFileSync('./db/lastMessages.json'))
usersRemaining.usersOnline = []
fs.writeFileSync('./db/lastMessages.json', JSON.stringify(_.cloneDeep(usersRemaining)))

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))

app.get('/lastData', (req, res) => {
  res.json(JSON.parse(fs.readFileSync('./db/lastMessages.json')))
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

io.on('connection', socket => {
  console.log('user connected')

  socket.on('new user', (username, colorUser, colorMsg, fontUser, fontMsg) => {
    console.log(username + ' logged in')

    let users = JSON.parse(fs.readFileSync('./db/lastMessages.json'))
    users.usersOnline.push({ username, socket: socket.id, colorUser, colorMsg, fontUser, fontMsg })
    fs.writeFileSync('./db/lastMessages.json', JSON.stringify(_.cloneDeep(users)))
    io.sockets.emit('new user', username, colorUser, colorMsg, fontUser, fontMsg )
  })

  socket.on('message', msg => {
    console.log(msg.username + ': ' + msg.inputValue)

    let lastMsg = JSON.parse(fs.readFileSync('./db/lastMessages.json'))
    lastMsg['5'].shift()
    lastMsg['5'].push(msg)
    fs.writeFileSync('./db/lastMessages.json', JSON.stringify(_.cloneDeep(lastMsg)))
    io.sockets.emit('message', msg)
  })

  
  socket.on('logout', username => {
    console.log(username + ' logged out')

    let users = JSON.parse(fs.readFileSync('./db/lastMessages.json'))
    users.usersOnline = users.usersOnline.filter(obj => obj.username !== username)
    fs.writeFileSync('./db/lastMessages.json', JSON.stringify(_.cloneDeep(users)))
    io.sockets.emit('logout', username)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')

    let users = JSON.parse(fs.readFileSync('./db/lastMessages.json'))
    users.usersOnline = users.usersOnline.filter(obj => obj.socket !== socket.id)
    fs.writeFileSync('./db/lastMessages.json', JSON.stringify(_.cloneDeep(users)))
    io.sockets.emit('disconnect')
  })
})

http.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
