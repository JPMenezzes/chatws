window.addEventListener('load', () => {
  const socket = io();
  console.log('Conectando ao servidor via WebSocket');

  document.getElementById('form').addEventListener('submit', (evt) => {
    const msg = document.getElementById('msg').value;
    if(socket.login){
    socket.emit('chat msg', msg);
    }
    else {
    socket.emit('login', msg);
    socket.login = msg;
    }
    console.log('enviando msg: ' + msg)
    evt.preventDefault();
    
    document.getElementById('msg').addEventListener('keydown', () => {
      socket.emit('status', `${socket.login} está digitando...`)
    })

    document.getElementById('msg').addEventListener('keyup', () => socket.emit('status', ''));
  })

  socket.on('chat msg', msg => document.getElementById('mensagens').innerHTML += `<li>${msg}</li>`);

  socket.on('status', msg => document.getElementById('status').innerHTML = msg);

  /*document.getElementById('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
  })*/
})