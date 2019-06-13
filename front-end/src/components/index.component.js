import React, {Component} from 'react'; 
import axios from 'axios';  
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 

import CreateTodo from "./create-todo.component";
export default class Index extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user_name: '',
            user_password: '', 
            users: [],  
            adminusers: [],
            loginaceito: false, 
            loginadm: false
        }
    } 
    onChangeUserName(e) {
        this.setState({
            user_name: e.target.value
        });
    } 
    onChangeUserPassword(e) {
        this.setState({
            user_password: e.target.value
        });
    }   
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`User Name: ${this.state.user_name}`); 
        console.log(`User Password: ${this.state.user_password}`); 
         
        const newUser = {
            user_name: this.state.user_name,
            user_password: this.state.user_password
        }    

        axios.get('http://localhost:4000/users/')
        .then(response => {
            this.setState({users: response.data});  
            this.state.users.map(user => {  
                if (user.user_name === this.state.user_name){ 
                    if(user.user_password === this.state.user_password){    
                        this.props.history.push('/menuuser'); 
                        //console.log(this.state.loginaceito)
                        //window.location.replace("http://localhost:3000/create"); 
                    } 
                } 
            }
            ) 
        //    console.log(this.state.users)
        })
        .catch(function (error) {
            console.log(error);
        })   
        
        axios.get('http://localhost:4000/admusers/')
        .then(response => {
            this.setState({adminusers: response.data});  
            
        this.state.adminusers.map(adminuser => {  
            if (adminuser.user_name === this.state.user_name){ 
                if(adminuser.user_password === this.state.user_password){   
                    this.props.history.push('/todoslist');  
                } 
            } 
        } 
        )          
        })
        .catch(function (error) {
            console.log(error);
        })   
       
    } 

    render() { 
        return (  
            <div style={{marginTop: 20}}>
            <h3>Fazer login</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Ra: </label>
                    <input  type="text"
                            className="form-control"
                            value={this.state.user_name}
                            onChange={this.onChangeUserName}
                            />
                </div>
                <div className="form-group">
                    <label>Senha: </label>
                    <input  type="password"
                            className="form-control"
                            value={this.state.user_password}
                            onChange={this.onChangeUserPassword}
                            />
                </div>  
                <div className="form-group">  
                    <input type="submit" value="Entrar" className="btn btn-warning" /> 
                   
                </div>   
            </form> 
            
        </div>
            
            
        ) 
        
    }  
}