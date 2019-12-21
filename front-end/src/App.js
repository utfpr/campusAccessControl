import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import token from "./services/apiAuth";

import Login from "./screens/Login";
import AcessosAluno from "./screens/acessosAluno";
import AcessosDirex from "./screens/acessosDirex";
import AcessosPortaria from "./screens/acessosPortaria";

class App extends Component {
  render() {
    token()
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/meusAcessos" exact component={AcessosAluno} />
          <Route path="/gerenciarAcessos" exact component={AcessosDirex} />
          <Route path="/acessosPortaria" exact component={AcessosPortaria} />
        </div>
      </Router>
    );
  }
}

export default App;
