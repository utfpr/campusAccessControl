import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodoDirec extends Component {

    constructor(props) {
        super(props); 

        this.onChangeTodoTags = this.onChangeTodoTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_tags: []
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


    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_tags: this.state.todo_tags
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
                        <label>Estado: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_tags}
                                onChange={this.onChangeTodoTags}
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
