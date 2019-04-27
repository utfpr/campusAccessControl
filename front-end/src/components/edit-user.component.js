import React, {Component} from 'react';
import axios from 'axios';

export default class EditUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this); 
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user_name: '',
            user_email: '',  
            user_password: '',
            user_type: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/users/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    user_name: response.data.user_name,
                    user_email: response.data.user_email,
                    user_password: response.data.user_password,
                    user_type: response.data.user_type
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeUserName(e) {
        this.setState({
            user_name: e.target.value
        });
    }

    onChangeUserEmail(e) {
        this.setState({
            user_email: e.target.value
        });
    } 
 
    onChangeUserPassword(e) {
        this.setState({
            user_password: e.target.value
        });
    }  

    onChangeUserType(e) {
        this.setState({
            user_type: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            user_name: this.state.user_name,
            user_email: this.state.user_email, 
            user_password: this.state.user_password,
            user_type: this.state.user_type
        };
        axios.post('http://localhost:4000/users/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));

    this.props.history.push('/');
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Editar usuário</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.user_name}
                                onChange={this.onChangeUserName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.user_email}
                                onChange={this.onChangeUserEmail}
                                />
                    </div> 

                    <div className="form-group">
                        <label>Password: </label>
                        <input  type="password"
                                className="form-control"
                                value={this.state.user_password}
                                onChange={this.onChangeUserPassword}
                                />
                    </div> 

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="typeOptions"
                                    id="typeLow"
                                    value="Aluno"
                                    checked={this.state.user_type==='Aluno'}
                                    onChange={this.onChangeUserType}
                                    />
                            <label className="form-check-label">Aluno</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="typeOptions"
                                    id="typeMedium"
                                    value="Professor"
                                    checked={this.state.user_type==='Professor'}
                                    onChange={this.onChangeUserType}
                                    />
                            <label className="form-check-label">Professor</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="typeOptions"
                                    id="typeHigh"
                                    value="Servidor"
                                    checked={this.state.user_type==='Servidor'}
                                    onChange={this.onChangeUserType}
                                    />
                            <label className="form-check-label">Servidor</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}