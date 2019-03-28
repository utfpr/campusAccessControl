'use strict'; 
 
// use mongoose database (online)
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
  
// create a new schema of customer

const schema = new Schema({ 
    number: { 
        type: String, 
        required: true 
    },     
    createDate: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },    
    items: [{   
        // DIR'S
        diretoria: { 
            type: Number, 
            required: true, 
            default: 1 
        },    
        //sala  
        requester: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Requester' 
        }

    }],   
}); 
  

// export the model of customer 
module.exports = mongoose.model('Order', schema);