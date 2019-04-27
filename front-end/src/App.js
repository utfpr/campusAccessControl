import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

<<<<<<< HEAD
import CreateUser from "./components/create-user.component";

=======
>>>>>>> cfe49bd2976d2ae5f63adf7aab0010a17fcc70a0
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
                  <Link to="/" className="nav-link">Acessos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Criar acesso</Link>
<<<<<<< HEAD
                </li> 

                <li className="navbar-item">
                  <Link to="/createuser" className="nav-link">Criar usuario</Link>
=======
>>>>>>> cfe49bd2976d2ae5f63adf7aab0010a17fcc70a0
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
<<<<<<< HEAD
          <Route path="/create" component={CreateTodo} /> 
          <Route path="/createuser" component={CreateUser} />
=======
          <Route path="/create" component={CreateTodo} />
>>>>>>> cfe49bd2976d2ae5f63adf7aab0010a17fcc70a0
        </div>
      </Router>
    );
  }
}

export default App;
