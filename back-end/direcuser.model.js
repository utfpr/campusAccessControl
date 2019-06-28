const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DirecUser = new Schema({
    user_name: {
        type: String, 
        trim: true, 
        unique: true,
    },  
    user_password:{ 
        type: String, 
        trim: true
    }, 
});

module.exports = mongoose.model('DirecUser', DirecUser);