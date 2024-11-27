const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('messages');

const socket = new WebSocket('ws://localhost:8000/ws/chat/');

socket.onmessage = (event) => {
    const message = JSON.parse(event.data).message;
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    messagesDiv.appendChild(newMessage);
};

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    socket.send(JSON.stringify({ message }));
    messageInput.value = '';
});
