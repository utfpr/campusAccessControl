import React, {Component} from 'react';
import axios from 'axios'; 
import { Table ,  Divider, Tag } from 'antd';
import 'antd/dist/antd.css';
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
        return (<Table columns={columns} dataSource={this.state.todos} />  );   
    } 
}
