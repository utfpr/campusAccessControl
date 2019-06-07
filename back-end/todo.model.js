const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_description: {
        type: String, 
        trim: true
    },
    todo_responsible: {
        type: String, 
        trim: true
    }, 
    todo_horario:{ 
        type: String, 
        trim: true
    }, 
    todo_date:{ 
        type: String, 
        trim: true
    },
    todo_priority: {
        type: String, 
        trim: true 

    },
    todo_completed: {
        type: Boolean,   
        default: false 
    }, 
    todo_room:  { 
        type:String, 
        required: true
    }, 
    tags: [{    
        type: String,  
        required: true, 
        default: 'Em andamento',
    }],  
});

module.exports = mongoose.model('Todo', Todo);