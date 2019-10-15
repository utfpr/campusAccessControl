import React, {useState, useEffect, Component} from 'react';
import { getUserId } from '../services/auth';
import {Layout, Divider, Table, Tag, Row } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import NavBar from './navbar/navbar';


export default function UsuarioAcessoLista(){
    const [acessos, setAcessos] = useState();
    
    useEffect(()=>{
        axios
            .get('http://localhost:4000/todos/user/'+getUserId())
            .then((res) =>{
                setAcessos(res.data)
        }).catch((err)=>{

        });
    },[]
    );

    const columns = [
        {
            title: 'Descrição',
            dataIndex: 'todo_description',
            key: 'todo_description',
        },
        {
            title: 'Responsável',
            dataIndex: 'todo_responsible',
            key: 'todo_responsible'
        },
        {
            title: 'Horario',
            dataIndex: 'todo_horario',
            key: 'todo_horario',
        },
        {
            title: 'Data',
            dataIndex: 'todo_date',
            key: 'todo_date',
        }, 
        {
            title: 'Sala',
            dataIndex: 'todo_room',
            key: 'todo_room',
        },  
        {
            title: 'Justificativa',
            dataIndex: 'justificativa',
            key: 'justificativa',
        },  
        {
            title: 'Status',
            dataIndex: 'tags',
            key: 'tags',
        },
        {
            title: 'Ações',
            key: 'action', 
        },
    ];

    return (   
        <Layout style = {{ minHeight: '100vh' }}>   
            <NavBar/>
            <Divider/>
            <Row> 
                <Table columns={columns} dataSource={acessos} />
            </Row>     
        </Layout>  
    );
}