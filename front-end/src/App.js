import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
  
import Index from "./components/index.component";

import CriarAcesso from "./components/criar-acesso";
 
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

import CreateUser from "./components/create-user.component";
import EditUser from "./components/edit-user.component";
import UsersList from "./components/users-list.component";

import AcessoLista from "./components/list-access";  
import AcessosAceitos from "./components/lista-acessos-aceitos"; 
import AcessosRejeitados from "./components/lista-acessos-rejeitados";

import UsuarioAcessoLista from "./components/list-access-byuser";   
import MenuUser from "./components/menu-usuario.component";
 
import EditTodoDirec from "./components/direcedit-access";  
import ListaPorteiro from "./components/lista-acessos-porteiro";
import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          
          <Route path="/" exact component={Index} /> 
          <Route path="/todoslist" exact component={TodosList} />
          <Route path="/userlist" exact component={UsersList} />
          <Route path="/edit/:id" component={EditTodo} /> 
          <Route path="/editdirec/:id" component={EditTodoDirec} />
          <Route path="/edituser/:id" component={EditUser} />
          <Route path="/create/:id" component={CreateTodo} /> 
          <Route path="/createuser" component={CreateUser} /> 
          <Route path="/accesslist" component={AcessoLista} />  
          <Route path="/useraccesslist/:id" component={UsuarioAcessoLista} />         
          <Route path="/menuuser/:id" component={MenuUser} /> 
          <Route path="/listaportaria" component={ListaPorteiro} /> 
          <Route path="/criaracesso" component={CriarAcesso} /> 
          <Route path="/acessosaceitos" component={AcessosAceitos} /> 
          <Route path="/acessosrejeitados" component={AcessosRejeitados} />   
          
        </div>
      </Router>
    );
  }
}

export default App;
