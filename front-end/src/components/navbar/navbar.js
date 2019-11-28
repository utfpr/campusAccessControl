import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Layout, Col, Row, message, Icon, Button } from 'antd';
import './navbar.css';

const logo = require('../../images/logo.png');
const { Header } = Layout;

export default function Navbar() {
  const [nav, setNav] = useState('');

  const signout = () => {
    const hide = message.loading('Você se desconectou do sistema', 0);
    setTimeout(() => {
      setTimeout(hide, 1500);
      logout();
      setNav('/');
    }, 1500);
  }

  if (nav){
    return (<Redirect to={nav} />);
  }else{
    return (
      <Header>
        <Row 
          style = {{ 
            padding: '0 25px' 
          }}
        >
          <Col 
            sm={{ 
              span: 10, 
              offset: 2 
            }} 
            xs={{ 
              span: 12, 
              offset: 0 
            }}
          >
            <div>
              <Link to="/">
                <img src={logo} alt="Logo UTFPR" />
                {/* style={{ marginLeft: '280px', height: '63px' }} */}
              </Link>
            </div>
          </Col>

          <Col> 
            <Button 
              icon = "poweroff">
                Sair
            </Button>
          </Col>
        </Row>
      </Header>
    )
  }
}
