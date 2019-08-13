const express = require ('express');
const devController = require('./controllers/devController');
const likeController = require('./controllers/likeController');
const dislikeController = require('./controllers/dislikeController');

//Instanciando um função do express para rotas
const routes = express.Router();

//Configurando as rotas 
// GET, POST, PUT, DELETE

routes.get('/devs', devController.index);

routes.post('/devs', devController.store);

routes.post('/devs/:devId/likes', likeController.store);

routes.post('/devs/:devId/dislikes', dislikeController.store);


//Exportando rotas
module.exports = routes;