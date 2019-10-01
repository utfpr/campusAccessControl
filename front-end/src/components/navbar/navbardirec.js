// navbar.js

import React, {Component} from 'react';
import { Layout, Menu, Icon, Col, Button, Dropdown, message } from 'antd';
import { Link, Redirect } from "react-router-dom";

import Login from '../index.component';
import './navbar.css';
import { getToken, getStatus, getUserId, logout } from '../../services/auth';


const { Header } = Layout;
 
export default class NavBarDirec extends Component { 
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
 
  signout = () => {
    let hide = message.loading('Fazendo logout..', 0);

    setTimeout(() => {
      setTimeout(hide, 2000);

      logout();
      this.setState({ nav: '/' });
    }, 2000);
  } 
  
  acessosaceitos = () => {
    let hide = message.loading('Listando acessos aceitos', 0);
    setTimeout(() => {
      setTimeout(hide, 2000);
      this.setState({ nav: '/acessosaceitos' });
    }, 2000);
  } 
  
  acessosrejeitados = () => { 
      
    let hide = message.loading('Listando acessos rejeitados', 0);
    setTimeout(() => {
      setTimeout(hide, 2000);
      this.setState({ nav: '/acessosrejeitados' });
    }, 2000);  
  } 
  
  
  acessospendentes = () => {    
    let hide = message.loading('Listando acessos pendentes', 0);
    setTimeout(() => {
      setTimeout(hide, 2000);
      this.setState({ nav: '/todoslist' });
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
        <Menu.Item className = "linkNav" key = "aceito" onClick = { this.acessosaceitos }>
          <Icon type = "like" /> Acessos aceitos
        </Menu.Item>  
        <Menu.Item className = "linkNav" key = "rejeitado" onClick = { this.acessosrejeitados }>
          <Icon type = "close" /> Acessos rejeitados
        </Menu.Item>  
        <Menu.Item className = "linkNav" key = "solicitado" onClick = { this.acessospendentes }>
          <Icon type = "warning" /> Acessos pendentes
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
          :
            <div className = "buttonNav">
              <Dropdown className = "menu-mobile" overlay = {menuNone} placement = "bottomRight">
                <Button style = {{ marginTop: '16px' }}>
                  <Icon type = "menu" style = {{ fontSize: '18px', marginTop: '5px' }} />
                </Button>
              </Dropdown>
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