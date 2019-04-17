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
        type: String , 
        required: true, 
        trim: 'true' 
    }, 
    description: { // finality
        type: String, 
        required: true,
        trim: true
    },
     
    responsible: { // finality
        type: String, 
        required: true,
        trim: true, 
        unique: true
    },  

    state: { // open, forwarded, accept, rejected
        type: String, 
        trim: true, 
        default: 'Em andamento'
    },

    active: { 
        type: Boolean, 
        required: true, 
        default: true
    }, 
     
    datas: [{ // requisicao pode ser feita para várias datas 
        type: Date, 
        required: true, 
    }],
}); 
  

// export the model of Requester 
module.exports = mongoose.model('Requester', schema);
