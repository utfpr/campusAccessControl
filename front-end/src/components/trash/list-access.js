import React, {Component} from 'react';
import axios from 'axios'; 
import { Table, Tag, Layout, Row, Divider } from 'antd';
import 'antd/dist/antd.css'; 
import { string } from 'prop-types'; 

import NavBar from '../navbar/navbar';
const color = 'volcano'; 
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
    title: 'Prioridade',
    dataIndex: 'todo_priority',
    key: 'todo_priority',
  },  
  {
    title: 'Sala',
    dataIndex: 'todo_room',
    key: 'todo_room',
  }, 
  {
    title: 'Status',
    dataIndex: 'tags',
    key: 'tags',  
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = 'volcano';
          if (!tag.localeCompare("rejeitado")) {
            color = 'black';
          }
          if (!tag.localeCompare("aceito")) {
            color = 'green';
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

export default class AcessoLista extends Component {
 
  
constructor(props) {
  super(props);
  this.state = {todos: []}; 
 
}

componentDidMount() { 
  axios.get('http://localhost:4000/todos/')
      .then(response => {
          this.setState({todos: response.data}); 
          console.log(this.state.color)
      })
      .catch(function (error) {
          console.log(error);
      })
}

componentDidUpdate() {
    axios.get('http://localhost:4000/todos/')
    .then(response => {
        this.setState({todos: response.data});
    })
    .catch(function (error) {
        console.log(error);
    })   
}
    render() {
        return (  
          <Layout style = {{ minHeight: '100vh' }}>   
          <NavBar />
          <Divider/>
        <Row> 
        <Table columns={columns} dataSource={this.state.todos} />  </Row>     
        </Layout> 
         );   
    } 
}
