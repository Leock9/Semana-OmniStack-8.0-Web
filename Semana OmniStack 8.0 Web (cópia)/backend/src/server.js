//Importando o express
const express = require ('express');
//Importando o mongoose
const mongoose = require ('mongoose');
//Importando as rotas configuradas no routes.js
const routes = require ('./routes');
//Importando o cors para o front-end fazer requisições para essa api
const cors = require('cors');


//Instanciando o servidor 
const app = express();

//Unindo conexão websocket com http
const server = require ('http').Server(app);
//importando o Socket io
const io = require ('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

//Instanciando o a rota para o bando de dados
mongoose.connect('mongodb+srv://root:root@cluster0-uh7f0.mongodb.net/omnistack8?retryWrites=true&w=majority',
    { useNewUrlParser: true }
);

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
  
    return next();
});

//Indicando para o server usar o CORS
app.use(cors());
//Indicando para o server usar JSON
app.use(express.json());
//Indicando para o server usar o arquivo routes
app.use(routes);
//Configurando porta
server.listen(8080);