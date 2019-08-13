//axios importado para realizar a conexão com a api do github para buscar usuários.
const axios = require ('axios');
const Dev = require ('../models/dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find ({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes} }

            ],
        })

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        //Verificação de usuario
        const userExists = await Dev.findOne ({ user:username });

        if(userExists) {
            return res.json(userExists);
        }

        //Passando a api do github como corpo de resposta
        const response = await axios.get(`http://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        //Passando o objeto para o bando de dados
        const dev = await Dev.create ({
            name,
            user:username,
            bio,
            avatar:avatar

        })
        
        return res.json(dev);
    }
};