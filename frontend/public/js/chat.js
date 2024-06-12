const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('joinRoom', { roomId: 'room1', userId: 'user1' });

  document.getElementById('sendBtn').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value;
    socket.emit('sendMessage', { roomId: 'room1', message });
  });

  socket.on('receiveMessage', (data) => {
    const chatBox = document.getElementById('chatBox');
    const newMessage = document.createElement('div');
    newMessage.innerText = data.message;
    chatBox.appendChild(newMessage);
  });
});
