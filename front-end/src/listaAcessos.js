
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Divider, Tag } from 'antd';

import axios from 'axios'; 
import { Button, notification, Icon } from 'antd';

const columns = [
  {
    title: 'Descrição',
    dataIndex: 'todo_description',
    key: 'todo_description',
  },
  {
    title: 'Responsável',
    dataIndex: 'todo_responsible',
    key: 'todo_responsible',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Prioridade',
    key: 'todo_priority',
    dataIndex: 'todo_priority',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = 'volcano';
          if (!tag.localeCompare("alta")) {
            color = 'magenta';
          }
          if (!tag.localeCompare("média")) {
            color = 'gold';
          } 
          if (!tag.localeCompare("baixa")) {
            color = 'cyan';
          } 
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Data',
    dataIndex: 'todo_date',
    key: 'todo_date',
  },
  {
    title: 'Horário',
    dataIndex: 'todo_horario',
    key: 'todo_horario',
  },
  {
    title: 'Sala',
    dataIndex: 'todo_room',
    key: 'todo_room',
  },
  {
    title: 'Status',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = 'volcano';
          if (!tag.localeCompare("rejeitado")) {
            color = 'red';
          }
          if (!tag.localeCompare("aceito")) {
            color = 'green';
          } 
          if (!tag.localeCompare("solicitado")) {
            color = 'orange';
          } 
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
];


//insere fake data para visualização 
const data = [
  {
    key: '1',
    todo_description: 'John Brown estudar',
    todo_responsible: 'Joe Black',
    todo_priority: ['média'],
    todo_date: '30/09/19',
    todo_horario: '16:55',
    todo_room: 'B005',
    tags: ['solicitado'],
  },
  {
    key: '2',
    todo_description: 'Milenia Blank projeto',
    todo_responsible: 'Sidney Lake',
    todo_priority: ['alta'],
    todo_date: '28/09/19',
    todo_horario: '14:25',
    todo_room: 'C102',
    tags: ['aceito'],
  },
  {
    key: '3',
    todo_description: 'Joseph River balbúrdia',
    todo_responsible: 'Sidney Lake',
    todo_priority: ['baixa'],
    todo_date: '24/09/19',
    todo_horario: '18:32',
    todo_room: 'H107',
    tags: ['rejeitado'],
  },
];



export default function listaAcessos() {
  const[acessos, setAcessos] = useState('');

  useEffect( 
    () => {
      axios.get('http://localhost:4000/geral/')
      .then(response => {
        setAcessos(response);
      })
      .catch( (error) => {
          console.log(error);
          notification.open({
            message: 'Atenção!',
            description:
              'Algo deu errado!',
            icon: <Icon type="meh" style={{ color: '#108ee9' }} />,
          });
      })  
    }, 
    []
  )

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

//ReactDOM.render(<Table columns={columns} dataSource={data} />, document.getElementById('container'));
 
