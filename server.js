const express = require("express");
const { Stream } = require("stream");
const app = express();
const http = require("http").createServer(app);
serverSocket = require('socket.io')(http);
app.use(express.static('public'));

const PORT = 8080
http.listen(PORT, () => console.log('Server Initialized, door:' + PORT));

/*app.get("/teste", (req, res) => res.sendFile(__dirname + '/public/teste.html'));*/
serverSocket.on('connect', socket => {
  console.log('cliente conectado: ' + socket.id);

  socket.on('status', msg => socket.broadcast.emit('status', msg));

  socket.on('login', msg => {
    socket.login = msg;
    serverSocket.emit('chat msg', `${socket.login} conectou`);
  })

  socket.on('chat msg', msg => {
    console.log(`mensagem recebida do cliente: ${socket.id}: ${msg}`)
    serverSocket.emit('chat msg', `${socket.login} ${msg}`);
  })  
})
/*app.get("/paginas/ola.html", (req, res) => res.send('Salve ae Sabrina'));*/
