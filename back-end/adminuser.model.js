const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AdminUser = new Schema({
    user_name: {
        type: String, 
        trim: true
    },
    user_password:{ 
        type: String, 
        trim: true
    }, 
});

module.exports = mongoose.model('AdminUser', AdminUser);