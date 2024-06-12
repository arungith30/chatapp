const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = require('./server');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('joinRoom', ({ roomId, userId }) => {
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);
  });

  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('receiveMessage', { message });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
