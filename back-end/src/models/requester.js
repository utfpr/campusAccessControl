'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;  


// create a new schema of requester 

const schema = new Schema({ 
    numero: { // f001 - (place, room) 
        type: String, 
        required: true, 
        trim: true 
    },      
 
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer'
    },  

    horario: { 
        type: String, 
        required: [true, 'O horario de uso da sala é obrigatório (ex: indeterminado)'], 
        trim: true, 
        index: true 
    }, 
    description: { // finality
        type: String, 
        required: true,
        trim: true
    },
     
    responsible: { // finality
        type: String, 
        required: true,
        trim: true
    },  

    state: { // open, forwarded, accept, rejected
        type: String, 
        trim: true
    },

    active: { 
        type: Boolean, 
        required: true, 
        default: true
    }, 
     
    datas: [{ // requisicao pode ser feita para várias datas 
        type: String, 
        required: true, 
    }],
}); 
  

// export the model of Requester 
module.exports = mongoose.model('Requester', schema);
