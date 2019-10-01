// navbar.js

import React, {Component} from 'react';
import { Layout, Menu, Icon, Col, Button, Dropdown, message } from 'antd';
import { Link, Redirect } from "react-router-dom";

import './navbar.css';
import { getToken, getStatus, getUserId, logout } from '../../services/auth';


const { Header } = Layout;
 
export default class NavBar extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      nav: '',
      token: getToken(),
      //      status: getStatus(),
      // token: null,
      // status: '2',
      modal: false,
      home: this.props.home
    };
    
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
 
  criaracesso = () => { 
    this.setState({nav: '/criaracesso'});
  } 
  visualizaracessosusuario = () => { 
    this.setState({nav: '/useraccesslist/'+getUserId()});
  }
  signout = () => {
    let hide = message.loading('Fazendo logout..', 0);

    setTimeout(() => {
      setTimeout(hide, 2000);

      logout();
      this.setState({ nav: '/' });
    }, 2000);
  }

  render() {
    if(this.state.nav) {
      return <Redirect to = { this.state.nav } />
    }

    let menu = (
      <Menu> 
        {/**
        { this.state.token && (this.state.status === '0') ?
          <Menu.Item className = "linkNav" key = "perfil">
            <Link className = "linkNav" to = {"/profilesimpleuser/" + getUserId()}>
              <Icon type = "setting" /> Perfil
            </Link>
          </Menu.Item>
        : this.state.token && (this.state.status === '1') ?
        <Menu.Item className = "linkNav" key = "perfil">
          <Link className = "linkNav" to = {"/profilecompanyuser/" + getUserId()} >
            <Icon type = "setting" /> Perfil
          </Link>
        </Menu.Item>
      : null }
        */} 
        
        <Menu.Item className = "linkNav" key = "criaracesso" onClick = { this.criaracesso }>
          <Icon type = "plus-circle" /> Criar novo acesso
        </Menu.Item> 
        
        <Menu.Item className = "linkNav" key = "veracessos" onClick = { this.visualizaracessosusuario }>
          <Icon type = "eye" /> Visualizar meus acessos
        </Menu.Item>
        <Menu.Item className = "linkNav" key = "logout" onClick = { this.signout }>
          <Icon type = "logout" /> Logout
        </Menu.Item> 
      </Menu>
    );

    let menuNone = (
      <Menu>
        <Menu.Item key = "login" onClick = { this.toggle }> 
          <Icon type = "login" /> Login
        </Menu.Item>
        <Menu.Item key = "createuser"> 
          <Link to = "/createuser"> <Icon type = "user-add" /> Cadastro </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header className = "header" style = { this.props.home ? { position: 'fixed' } : {} }>
        <Col span = { this.props.home ? 3 : 6 } offset = { this.props.home ? 0 : 9 }>
          <div className = "logo text-center">
            {/* <Link to = "/">
              <img src = {require("../../images/logo.png")} alt = "logo Sistema" />
            </Link> */}
          </div>
        </Col>

        <Col span = { this.props.home ? 10 : 8 } className = "buttonNav menu-usuario">
          { this.state.token && !this.props.home ?
            <Dropdown overlay = { menu } placement = "bottomRight">
              <Button className = "buttonNav" style = {{ marginLeft: 8 }}>
                <Icon type = "user" style = {{ fontSize: '18px', marginTop: '5px' }} />
              </Button>
            </Dropdown>
          : this.state.token && this.state.status && this.props.home ?
            <Link to = { this.state.status === "0" ? "/map" : this.state.status === "1" ? "/listReport" : "/listusers"}>
              <Button className = "buttonNav menu-web" type = "primary" style = {{ marginLeft: 8 }}>
                <Icon type = "logout"/> Voltar Sistema
              </Button>
            </Link>
          :
            <div className = "buttonNav">
              <Dropdown className = "menu-mobile" overlay = {menuNone} placement = "bottomRight">
                <Button style = {{ marginTop: '16px' }}>
                  <Icon type = "menu" style = {{ fontSize: '18px', marginTop: '5px' }} />
                </Button>
              </Dropdown>

              <Button className = "buttonNav menu-web" style = {{ marginLeft: 8 }} onClick = { this.toggle }>
                <Icon type = "login"/> Login
              </Button>      
              <Link to = "/createuser">
                <Button className = "buttonNav menu-web" type = "primary" style = {{ marginLeft: 8 }}>
                  <Icon type = "user-add"/> Cadastro
                </Button>
              </Link>
            </div>
          }
        </Col> 
        {/**
        <Login visible = { this.state.modal } toggle = { this.toggle } /> 
         */}
      </Header>
    );
  }
}