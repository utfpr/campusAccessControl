'use strict'; 
const mongoose = require('mongoose'); 
const Customer =  mongoose.model('Customer');  
 
exports.create = async (data) => { 
    var customer = new Customer(data); 
    await customer.save(); 
}  

exports.get = async () => {  
    const res = await Customer.find({}, 'name email type'); 
    return res;    
}  