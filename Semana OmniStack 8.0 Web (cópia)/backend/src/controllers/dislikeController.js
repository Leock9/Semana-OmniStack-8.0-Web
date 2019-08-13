const Dev = require ('../models/dev');

module.exports = {
   async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;
    
    //fazendo a requisição no bando de dados
    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    //Verificando se o usuário existe para dar dislike
    if (!targetDev) {
        return res.status(400).json({ error: 'Dev not exists'});
    }

   
    //Armazenando o dislike no login alvo
    loggedDev.dislikes.push(targetDev._id);

    //Armazenando na base de dados
    await loggedDev.save();

    return res.json(loggedDev);
        
  
    }

};