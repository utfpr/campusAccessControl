const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    user_name: {
        type: String, 
        trim: true
    },
    user_email: {
        type: String, 
        trim: true, 
        unique: true
    }, 
    user_password:{ 
        type: String, 
        trim: true
    }, 
    user_type: {
        type: String, 
        trim: true, 
     
    }
});

module.exports = mongoose.model('User', User);