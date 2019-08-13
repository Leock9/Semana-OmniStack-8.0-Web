import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './login.css';
import api from '../services/api';

//export pode ser colocado no final tambem
export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        //Enviando o nome digitado para Api buscar o dev
        const response = await api.post('/devs', {
            username,
        });

        //Pegando apenas o ID
        const { _id } = response.data;

        //Passando a rota
        history.push(`/dev/${ _id }`);
    }


    return (
        <div className= "login-container">
            <form onSubmit = {handleSubmit}>
                <img src = {logo} alt ="Tindev"/>
                <input 
                placeholder ="Digite seu usuário do Github"
                value = {username}
                onChange = {e => setUsername(e.target.value)}
                />
                <button type = "submit">Enviar</button>
            </form>
        </div>

    );

}

