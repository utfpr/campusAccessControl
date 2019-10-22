import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { login, getUserId } from '../../services/auth';

import styles from './LoginScreen.module.scss';
import image from '../../images/logo.png';

import {
    Input, Icon, Button, Form,
    message, notification
} from 'antd';

const LoginForm = props => {

    const {getFieldDecorator, isFieldTouched, getFieldError} = props.form;

    const onSubmit = e => {
        e.preventDefault();

        props.form.validateFields((err, values) => {
            axios.post('/doLogin',{ra, senha})
            .then(response => {
                login(response.token, 0, response.ra);
            })  
            .catch((error) => {
                notification.error({
                    message:' Erro ',
                    description: 'Suas credências não bateram, provavelmente é um erro humano',
                    duration: 6
                })
                console.log(error);
            })
        })

    }

    const [ra, setRa] = useState('');
    const [senha, setSenha] = useState('');

    const raError = isFieldTouched('ra') && getFieldError('ra');
    const senhaError = isFieldTouched('senha') && getFieldError('senha');

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
                                            len: 1,
                                            message: 'Seu R.A ou Login não é válido!'
                                        },
                                    ],
                                })(
                                    <Input 
                                        type="text"
                                        placeholder="R.A ou Login"
                                        value={ra}
                                        onChange={e=>setRa(e.target.value)}
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
                                    min: 8,
                                    message: 'Sua senha não é válida!'
                                }],
                            })(
                                <Input.Password
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={e=>setSenha(e.target.value)}
                                />
                            )}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    className="btn btn-warning"
                                    disabled = {!ra || !senha || raError || senhaError}
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
    // }

}

const WrappedHorizontalLoginForm = Form.create({ name: 'login' })(LoginForm);

export default WrappedHorizontalLoginForm;