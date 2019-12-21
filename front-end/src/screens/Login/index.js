import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { login, getToken, setAluno } from '../../services/auth';

import styles from './LoginScreen.module.scss';
import image from '../../images/logo.png';
import { Redirect } from 'react-router-dom';
import {
  Input, Button, Form, notification
} from 'antd';

const Login = (props) => {

  const { getFieldDecorator, isFieldTouched, getFieldError, setFieldsValue } = props.form;
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const [dados, setDados] = useState('');
  const [nav, setNav] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      axios.post(proxyurl + 'http://200.134.18.85:19881/ldap/doLogin', { user: ra, password: senha }, { headers: { "Authorization": `Bearer ${getToken()}` } })
        .then(response => {
          login(response.data.token, 0, response.data.ra);
          setDados(response.data);
          redirecionar(response.data);
        })
        .catch((error) => {
          notification.error({
            message: ' Erro ',
            description: 'Suas credências não bateram, provavelmente é um erro humano',
            duration: 6
          })
          console.log(error);
        })
    })

  }

  function redirecionar(dados) {
    let aux = dados.uid.search("ou=alunos");
    if (aux === -1) {
      setAluno(false);
      setNav("/gerenciarAcessos");
    } else {
      setAluno(true);
      setNav("/meusAcessos");
    }
  }

  const [ra, setRa] = useState('');
  const [senha, setSenha] = useState('');

  const raError = isFieldTouched('ra') && getFieldError('ra');
  const senhaError = isFieldTouched('senha') && getFieldError('senha');
  if (nav) {
    return (<Redirect to={nav} />)
  } else {
    return (
      <div className={styles.holder}>
        <div className={styles.bgImage} />
        <div className={styles.pcontainer}>
          <div className={styles.card}>
            <img className={styles.brazao} alt="brazão" src={image} />
            <h1>Controle de Acesso ao Campus<br />UTFPR - Campo Mourão</h1>
            <Form>
              <Form.Item
                validateStatus={raError ? 'error' : ''}
                help={raError || ''}
              >
                {getFieldDecorator('ra', {
                  rules: [
                    {
                      required: true,
                      len: 8,
                      message: 'Seu R.A ou Login não é válido!'
                    },
                  ],
                })(
                  <Input
                    type="text"
                    placeholder="R.A ou Login"
                    value={ra}
                    onChange={e => setRa(e.target.value)}
                  />
                )}
              </Form.Item>
              <Form.Item
                validateStatus={senhaError ? 'error' : ''}
                help={senhaError || ''}
              >
                {getFieldDecorator('senha', {
                  rules: [{
                    required: true,
                    min: 1,
                    message: 'Sua senha não é válida!'
                  }],
                })(
                  <Input.Password
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="btn btn-warning"
                  disabled={!ra || !senha || raError || senhaError}
                  onClick={
                    onSubmit
                  }
                >
                  Entrar
              </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );

  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'form_login' })(Login);
export default WrappedHorizontalLoginForm;