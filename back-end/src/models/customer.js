'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
  
// create a new schema of customer

const schema = new Schema({ 
    name: { 
        type: String, 
        required: true 
    },    
    email: { 
        type: String, 
        required: true 
    },    
    password: { 
        type: String, 
        required: true 
    },   
    
    type: { // aluno, servidor,diretoria 
        type: String,   
        required: true,
        trim: true 
    }
}); 
  

// export the model of customer 
module.exports = mongoose.model('Customer', schema);