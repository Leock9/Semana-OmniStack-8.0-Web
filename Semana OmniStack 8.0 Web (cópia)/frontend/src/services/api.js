import axios from 'axios';


//Configurando a api criada em NodeJs
const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export default api;