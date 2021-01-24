const ws = new WebSocket("ws://localhost:3000")
const submitButton = document.querySelector('#submit')
const sendButton = document.querySelector('#send')
const nameDiv = document.querySelector('#name-div')
const messageDiv = document.querySelector('#message-div')
const messageField = document.querySelector('#message')
messageDiv.style.display = "none"

ws.onopen = (e) => {
  console.log('WebSocket connection opened');
}

ws.onclose = (e) => {
  console.log('WebSocket connection closed');
}

ws.onerror = (e) => {
  console.error('WebSocket error!', error);
}

ws.onmessage = (e) => {
  const chat = document.querySelector('#chat')
  chat.innerHTML += `<div>${e.data}</div>`
}

submitButton.addEventListener('click', () => {
  let name = document.querySelector('#name')
  ws.send(JSON.stringify({ type: 'name', name: name.value }))
  nameDiv.style.display = "none"
  messageDiv.style.display = "block"
})

const sendMessage = () => {
  const message = document.querySelector('#message')
  const data = { type: 'message', message: message.value }
  // `<div> ${name.value}: ${message.value} </div>`
  ws.send(JSON.stringify(data))
  message.value =""
}

sendButton.addEventListener('click', sendMessage)
messageField.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) 
    sendMessage()
})
