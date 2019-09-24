// import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const User = props => (
//     <tr>
//         <td className={props.user.user_completed ? 'completed' : ''}>{props.user.user_name}</td>
//         <td className={props.user.user_completed ? 'completed' : ''}>{props.user.user_email}</td> 
//         <td className={props.user.user_completed ? 'completed' : ''}>{props.user.user_password}</td> 
//         <td className={props.user.user_completed ? 'completed' : ''}>{props.user.user_type}</td>
//         <td>
//             <Link to={"/edituser/"+props.user._id}>Edit</Link>
//         </td> 
//         <td>
//             <Link to={"/delete/"+props.user._id}>Delete</Link> 
//         </td>
//     </tr>
// )

// export default class UsersList extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {users: []};
//     }

//     componentDidMount() {
//         axios.get('http://localhost:4000/users/')
//             .then(response => {
//                 this.setState({users: response.data});
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })
//     }

//     componentDidUpdate() {
//         axios.get('http://localhost:4000/users/')
//         .then(response => {
//             this.setState({users: response.data});
//         })
//         .catch(function (error) {
//             console.log(error);
//         })   
//     }

//     userList() {
//         return this.state.users.map(function(currentUser, i) {
//             return <User user={currentUser} key={i} />;
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <h3>Lista de usuários</h3>
//                 <table className="table table-warning table-striped" style={{ marginTop: 20 }}>
//                     <thead>
//                         <tr>
//                             <th>Username</th>
//                             <th>Email</th> 
//                             <th>Password</th> 
//                             <th>Type</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         { this.userList() }
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Table,
    Icon
} from 'antd';

export default function UsersList(){
    const [user, setUser] = [];

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:4000/users/')
    //         .then(response => {
    //             this.setState({users: response.data});
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }, []);

    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          email: 'aamcc@utfpr.edu.br',
          password: '10 Downing Street',
          type: 'Aluno'
        },
        {
          key: '2',
          name: 'Joao',
          email: 'joao@utfpr.edu.br',
          password: 'porque vc mostaria a senha?',
          type: 'Servidor'
        },
      ];
      
      const columns = [
        {
          title: 'Username',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'Type',
          },
          {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',        
          render:() =>  (
              <span>
                  <Icon 
                    type='edit'
                  />
              </span>
          )    
          }        
      ];

    
    return (
            <Table dataSource={dataSource} columns={columns} />
    );
}