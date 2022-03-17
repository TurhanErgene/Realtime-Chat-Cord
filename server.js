const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder 
app.use(express.static(path.join(__dirname, 'public')))

const botName = "ChatCord Bot"
//run when client connects
io.on('connection', socket => {  

  //welcome client
  socket.emit('message', formatMessage(botName,'Welcome to ChadCord!'))

  //Broadcast when a user connects
  socket.broadcast.emit('message', formatMessage(botName,'A user has joined the chat!'))

  //Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName,'A user has left the chat!'))
  })

  //Listen for chat message
  socket.on('chatMessage', (msg) => {
    socket.emit('message', formatMessage('User',msg))
    console.log(msg);
  })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
