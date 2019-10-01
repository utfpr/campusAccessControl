import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { login, getUserId } from '../../services/auth';

import styles from './LoginScreen.module.scss';
import image from '../../images/logo.png';

import {
    Input, Icon, Button, Form,
    message, notification
} from 'antd';


export default function Login(props) {

    const [ra, setRa] = useState('');
    const [senha, setSenha] = useState('');
    
    const onSubmit = ()=>{
        axios.get('http://localhost:4000/users/getuser/'+{ra, senha})
        .then(response => {
            login(response.token, 0, response.ra);
        })  
        .catch((error) => {
            notification.error({
                message:' Erro ',
                description: 'Suas credências não bateram, provavelmente é um erro humano'
            })
            console.log(error);
        })
        
    }

    // render() {
    //     const { form } = props;
    //     const handleValuesChange = () => console.log('...');
    //     const { useForm } = Form;

    //     const form = useForm({
    //         onValuesChange : handleValuesChange,
    //     })
    //     const {
    //         getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    //     } = form;

    //     const raError = isFieldTouched('ra') && getFieldError('ra');
    //     const senhaError = isFieldTouched('senha') && getFieldError('senha');

        return (
            <div className={styles.holder}>
                <div className={styles.bgImage} />
                <div className={styles.pcontainer}>
                    <div className={styles.card}>
                        <img className={styles.brazao} alt="brazão" src={image} />
                        <h1>Controle de Acesso ao Campus<br />UTFPR - Campo Mourão</h1>
                        <Form>
                            <Form.Item
                                // validateStatus={raError ? 'error' : ''}
                                // help={raError || ''}
                            >
                                {/* {getFieldDecorator('ra', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Insira seu RA!'
                                        },
                                    ],
                                })( */}
                                    <Input 
                                        type="text"
                                        placeholder="RA"
                                        value={ra}
                                        onChange={e=>setRa(e.target.value)}
                                    />
                                {/* )} */}
                            </Form.Item>
                            <Form.Item
                                // validateStatus={senhaError ? 'error' : ''}
                                // help={senhaError || ''}
                            >
                            {/* {getFieldDecorator('senha', {
                                rules: [{
                                    required: true,
                                    message: 'Insira sua senha!'
                                }],
                            })( */}
                                <Input.Password
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={e=>setSenha(e.target.value)}
                                />
                            {/* )} */}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    className="btn btn-warning"
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

// const WrappedHorizontalLoginForm = Form.create({ name: 'login_form' })(LoginScreen);

// export default WrappedHorizontalLoginForm;