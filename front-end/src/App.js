import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
  
import Index from "./components/index.component";

 
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

import CreateUser from "./components/create-user.component";
import EditUser from "./components/edit-user.component";
import UsersList from "./components/users-list.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com">
              <img src={logo} width="150" height="100" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Campus Access Control</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/todoslist" className="nav-link">Acessos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Criar acesso</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/userlist" className="nav-link">Usuários</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/createuser" className="nav-link">Criar usuário</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={Index} /> 
          <Route path="/todoslist" exact component={TodosList} />
          <Route path="/userlist" exact component={UsersList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/edituser/:id" component={EditUser} />
          <Route path="/create" component={CreateTodo} /> 
          <Route path="/createuser" component={CreateUser} />
          
        </div>
      </Router>
    );
  }
}

export default App;
