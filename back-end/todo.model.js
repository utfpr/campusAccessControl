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
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);