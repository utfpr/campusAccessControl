import React, { useState } from 'react';
import { Layout, Menu, Col, Row, message, Dropdown, Icon, Button, BackTop } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../services/auth';
import './navbar.css';

const logo = require('../../images/logo.png');

const { Header } = Layout;
const { Content } = Layout;

export default function NavBar(props) {
  const [nav, setNav] = useState('');

  const signout = () => {
    const hide = message.loading('Você se desconectou do sistema', 0);
    setTimeout(() => {
      setTimeout(hide, 1500);
      logout();
      setNav('/');
    }, 1500);
  }

  function LogoutButton() {
    if (!(props.btn === '0')) {
      return (
        <div>
          <Col span={12}>
            <Button onClick={signout} size="large" style={{ float: "right", marginTop: "40px" }}>
              <Icon type="logout" theme="outlined" />Sair
          </Button>
          </Col>
        </div>
      )
    }else{
      return null;
    }
  }

  if (nav) {
    return (<Redirect to={nav} />);
  } else {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ backgroundColor: '#e3e3e3', height: "120px", padding: "10px" }}>
          <Row style={{ padding: '0 25px' }} span={4}>
            <Col span={12}>
              <div style={{ float: "left", height: "5%" }}>
                <img src={logo} alt="Logo UTFPR" style={{ width: "40%" }} />
              </div>
            </Col>

            <LogoutButton/>
          </Row>
        </Header>
        <Layout>
          <Content style={{ padding: 24, paddingTop: 50, background: '#FFF', minHeight: 280 }}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}