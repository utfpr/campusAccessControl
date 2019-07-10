import React, {Component} from 'react'; 
import axios from 'axios';  
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import { login, getUserId } from './services/auth';

const jwt = require('jsonwebtoken');

//import CreateTodo from "./create-todo.component"; 
// view of login 
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
            direcusers: [],
            loginaceito: false, 
            loginadm: false, 
            idusuario:''
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

        axios.get('http://localhost:4000/users/getuser/'+this.state.user_name)
        .then(response => {
            this.setState({users: response.data});  
            console.log(this.state.users); 
            this.state.users.map(user => {  
                if (user.user_email === this.state.user_name){ 
                    if(user.user_password === this.state.user_password){    
                        var token = jwt.sign({ id: user._id }, 'secret', { expiresIn: 14400 });
                        login(token, 0, user._id);
                        const idusuario = getUserId();                       
                        this.props.history.push('/useraccesslist/'+idusuario);  
                        alert("Ola "+user.user_name);
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
        
        axios.get('http://localhost:4000/usersdirec/')
        .then(response => {
            this.setState({direcusers: response.data});  
            
        this.state.direcusers.map(direcuser => {  
            if (direcuser.user_name === this.state.user_name){ 
                if(direcuser.user_password === this.state.user_password){    
                    var token = jwt.sign({ id: direcuser._id }, 'secret', { expiresIn: 14400 });
                    login(token, 0, direcuser._id);                 
                    this.props.history.push('/todoslist/');  
                    alert("Ola "+direcuser.user_name); 
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