import React, {Component} from 'react';
import axios from 'axios'; 
import { Table } from 'antd';

const columns = [ 
  {
    title: 'Cpf',
    dataIndex: 'cpf',
    key: 'cpf',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  
];

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {simpleusers: []};
    }
    componentDidMount() { 
        axios.get('/simpleusers')
            .then(response => {
                this.setState({simpleusers: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (<Table columns={columns} dataSource={this.state.simpleusers} />  );   
    } 
}