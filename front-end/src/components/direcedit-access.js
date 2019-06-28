import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodoDirec extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoHorario = this.onChangeTodoHorario.bind(this);
        this.onChangeTodoDate = this.onChangeTodoDate.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this); 
        this.onChangeTodoTags = this.onChangeTodoTags.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_horario: '',
            todo_date: '',
            todo_priority: '', 
            todo_tags: [],
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_horario: response.data.todo_horario,
                    todo_date: response.data,
                    todo_priority: response.data.todo_priority, 
                    todo_tags: response.data.tags, 
                    todo_completed: response.data.todo_completed
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
    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }
    onChangeTodoHorario(e) {
        this.setState({
            todo_horario: e.target.value
        });
    }

    onChangeTodoDate(e) {
        this.setState({
            todo_date: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_horario: this.state.todo_horario,
            todo_date: this.state.todo_date,
            todo_priority: this.state.todo_priority, 
            todo_tags: this.state.todo_tags,
            todo_completed: this.state.todo_completed
        };
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <label>Horario: </label>
                        <input  type="time"
                                className="form-control"
                                value={this.state.todo_horario}
                                onChange={this.onChangeTodoHorario}
                                />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input  type="date"
                                className="form-control"
                                value={this.state.todo_date}
                                onChange={this.onChangeTodoDate}
                                />
                    </div>  
                   
                    <div className="form-group">
                        <label>Estado: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_tags}
                                onChange={this.onChangeTodoTags}
                                />
                    </div> 
                   
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Aluno"
                                    checked={this.state.todo_priority==='Aluno'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Aluno</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Professor"
                                    checked={this.state.todo_priority==='Professor'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Professor</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="Servidor"
                                    checked={this.state.todo_priority==='Servidor'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Servidor</label>
                        </div> 
                        {/* 
                        <div className="form-check">
                            <input  type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeTodoCompleted}
                                    checked={this.state.todo_completed}
                                    value={this.state.todo_completed}
                                    />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
                            </label>
                        </div> 
                        */}
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
