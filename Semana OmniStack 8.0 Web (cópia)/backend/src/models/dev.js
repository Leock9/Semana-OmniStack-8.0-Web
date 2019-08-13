//Importando Schema e model do mongoose com destructuring
const { Schema, model } = require ('mongoose');

//Criando a estrutura do bando para armazenar o desenvolvedor.
const DevSchema = new Schema ({
    name: {
        type:String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type:Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    dislikes: [{
        type:Schema.Types.ObjectId,
        ref: 'Dev'
    }]
}, {
    timestamps: true,
});

//timestamps usado para salvar a data de criação e atualização do usuário

module.exports = model ('Dev', DevSchema);