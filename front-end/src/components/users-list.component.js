import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td className={props.user.user_completed ? 'completed' : ''}>{props.user.user_name}</td>
        <td className={props.user.user_completed ? 'completed' : ''}>{props.user.user_email}</td> 
        <td className={props.user.user_completed ? 'completed' : ''}>{props.user.user_password}</td> 
        <td className={props.user.user_completed ? 'completed' : ''}>{props.user.user_type}</td>
        <td>
            <Link to={"/edituser/"+props.user._id}>Edit</Link>
        </td>
    </tr>
)

export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/users/')
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/users/')
        .then(response => {
            this.setState({users: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    userList() {
        return this.state.users.map(function(currentUser, i) {
            return <User user={currentUser} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Lista de usuários</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th> 
                            <th>Password</th> 
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
            </div>
        )
    }
}