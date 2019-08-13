import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//Importando as paginas
import Login from './pages/login';
import Main from './pages/main';

//Configurando rotas das paginas
export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component = {Login} />
            <Route path="/dev/:id" component = {Main} />
        </BrowserRouter>
    );

}