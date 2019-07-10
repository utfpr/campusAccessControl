import React, {Component} from 'react';
import axios from 'axios'; 
import { Table, Tag, Divider, Layout, Row, Typography } from 'antd'; 
import NavBar from './navbar/navbardirec'; 
import 'antd/dist/antd.css'; 
import { string } from 'prop-types';
import NavBarDirec from './navbar/navbardirec';
const color = 'volcano';  
const {Title} = Typography;

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
    title: 'Status',
    dataIndex: 'tags',
    key: 'tags', 
    onFilter: (value, record) => record.tags.indexOf(value) === 0,
    sorter: (a, b) => ("" + a.tags).localeCompare(b.tags),
    defaultSortOrder: 'ascend',
    sortDirections: ['ascend', 'descend'],  
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

export default class AcessosRejeitados extends Component {
  
constructor(props) {
  super(props);
  this.state = {todos: []}; 
 
}

componentDidMount() {  
  console.log(this.props.match.params.id)  
  axios.get('http://localhost:4000/todos/filtro/rejeitado')
      .then(response => {
          this.setState({todos: response.data}); 
          console.log(this.state.color)
      })
      .catch(function (error) {
          console.log(error);
      }) 
    console.log(this.state.todos)  
}

componentDidUpdate() {
    axios.get('http://localhost:4000/todos/filtro/rejeitado')
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
          <NavBarDirec /> 
          <Title className = "titleForm" level={1}> Acessos rejeitados </Title>  
        <Row> 
        <Table columns={columns} dataSource={this.state.todos} />  </Row>     
        </Layout> 
        );   
    } 
}
