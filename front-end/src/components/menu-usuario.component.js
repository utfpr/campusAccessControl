import React, {Component} from 'react';  
 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from "./create-todo.component";

export default class MenuUser extends Component { 

    render() { 
        return (    
            <div className="container">  
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collpase nav-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Criar accesso</Link>
                </li>  
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Visualizar meus accessos</Link>
                </li> 
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={CreateTodo} />      
          </div>     
            ) 
            
        }  
    }