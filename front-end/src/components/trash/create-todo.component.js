import React, {Component} from 'react';
import axios from 'axios'; 

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this); 
        this.onChangeTodoHorario = this.onChangeTodoHorario.bind(this);
        this.onChangeTodoDate = this.onChangeTodoDate.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this); 
        this.onChangeTodoRoom = this.onChangeTodoRoom.bind(this);  
        this.onChangeTodoUseremail = this.onChangeTodoUseremail.bind(this); 
        this.onChangeTodoUserid = this.onChangeTodoUserid.bind(this);  
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',  
            todo_horario: '',
            todo_date: '',
            todo_priority: '', 
            todo_room: '', 
            todo_useremail:'', 
            todo_userid:this.props.match.params.id, 
            users: [],  
            todo_completed: false
        }
    }
    

    onChangeTodoUserid(e) {
        this.setState({
            todo_userid: e.target.value
        });
    } 

    onChangeTodoUseremail(e) {
        this.setState({
            todo_useremail: e.target.value
        });
    }
    onChangeTodoRoom(e) {
        this.setState({
            todo_room: e.target.value
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
  

    onSubmit(e) {
        e.preventDefault();
        this.setState({ 
            todo_userid : this.props.match.params.id
        }) 
                
    console.log(`Form submitted:`);
    console.log(`Todo Description: ${this.state.todo_description}`);
    console.log(`Todo Responsible: ${this.state.todo_responsible}`); 
    console.log(`Todo Horario: ${this.state.todo_horario}`);
    console.log(`Todo Date: ${this.state.todo_date}`);
    console.log(`Todo Priority: ${this.state.todo_priority}`); 
    console.log(`Todo Room: ${this.state.todo_room}`);
    console.log(`Todo Completed: ${this.state.todo_completed}`);
    console.log(`Todo id: ${this.state.todo_userid}`);
    console.log(`Todo email: ${this.state.todo_useremail}`);
     
    
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible, 
            todo_horario: this.state.todo_horario,
            todo_date: this.state.todo_date,
            todo_priority: this.state.todo_priority, 
            todo_room: this.state.todo_room,  
            todo_userid: this.props.match.params.id, 
            tags: ["Solicitado"],
            todo_completed: this.state.todo_completed
        }

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_responsible: '', 
            todo_horario: '',
            todo_date: '',
            todo_priority: '', 
            todo_room: '', 
            todo_userid:'',
            todo_completed: false
        }) 
        //        const url = "/useraccesslist/"+this.props.match.params.id;
        this.props.history.push('/useraccesslist/'+this.props.match.params.id); 
 
    }

    render() { 
        

    
        return (
            <div style={{marginTop: 20}}>
                <h3>Criar novo acesso</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Descrição: </label>
                        <input  type="text"
                               className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsável: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>  
                    <div className="form-group">
                        <label>Horário: </label>
                        <input  type="time"
                                className="form-control"
                                value={this.state.todo_horario}
                                onChange={this.onChangeTodoHorario}
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
                    </div> 
                    <div className="form-group">
                        <label>Data: </label>
                        <input  type="date"
                                className="form-control"
                                value={this.state.todo_date}
                                onChange={this.onChangeTodoDate}
                                />
                    </div> 
                    <div className="form-group">
                        <label>Sala: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_room}
                                onChange={this.onChangeTodoRoom}
                                />
                    </div> 
                    <div className="form-group">
                        <input type="submit" value="Criar Acesso" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}