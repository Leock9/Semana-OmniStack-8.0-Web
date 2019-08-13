const Dev = require ('../models/dev');

module.exports = {
   async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;
    
    //fazendo a requisição no bando de dados
    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    //Verificando se o usuário existe para dar like
    if (!targetDev) {
        return res.status(400).json({ error: 'Dev not exists'});
    }

    //Caso de MATCH
    if (targetDev.likes.includes(loggedDev._id)) {
        const loggedSocket = req.connectedUsers[user];
        const targetSocket = req.connectedUsers[devId];
  
        if (loggedSocket) {
          req.io.to(loggedSocket).emit('match', targetDev);
        }
  
        if (targetSocket) {
          req.io.to(targetSocket).emit('match', loggedDev);
        }
    }
    

    //Armazenando o like no login alvo
    loggedDev.likes.push(targetDev._id);

    //Armazenando na base de dados
    await loggedDev.save();

    return res.json(loggedDev);
        
  
    }

};