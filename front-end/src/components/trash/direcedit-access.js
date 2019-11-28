import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodoDirec extends Component {

    constructor(props) {
        super(props); 

        this.onChangeTodoTags = this.onChangeTodoTags.bind(this); 
        this.onChangeTodoJustificativa = this.onChangeTodoJustificativa.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_tags: [], 
            justificativa:'',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_tags: response.data.tags 
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }
 
    onChangeTodoTags(e) {
        this.setState({
            todo_tags: e.target.value
        });
    }
    onChangeTodoJustificativa(e) {
        this.setState({
            justificativa: e.target.value
        });
    } 


    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_tags: this.state.todo_tags, 
            justificativa: this.state.justificativa
        };
        axios.put('http://localhost:4000/todos/updatedirec/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/todoslist'); 
    }

    render() {
        return (
            <div>
                <h3>Aceitar ou Rejeitar Acesso</h3>
                <form onSubmit={this.onSubmit}>
       
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <div>
                                <input  className="form-check-input"
                                            type="radio"
                                            name="AcceptReject"
                                            id="Accept"
                                            value="aceito"
                                            checked={this.state.todo_tags==='aceito'}
                                            onChange={this.onChangeTodoTags}
                                            />
                                <label className="form-check-label">Aceitar</label>
                            </div>
                            <div>
                                <input  className="form-check-input"
                                            type="radio"
                                            name="AcceptReject"
                                            id="Reject"
                                            value="rejeitado"
                                            checked={this.state.todo_tags==='rejeitado'}
                                            onChange={this.onChangeTodoTags}
                                            />
                                <label className="form-check-label">Rejeitar</label>
                            </div>
                        </div>
                    </div> 
                    <div className="form-group">
                    <label>Justificativa: </label>
                    <input  type="text"
                            className="form-control"
                            value={this.state.justificativa}
                            onChange={this.onChangeTodoJustificativa}
                            />
                    </div>
                    <div className="form-group"> 
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Editar Acesso" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
