'use strict'; 
const mongoose = require('mongoose'); 
const Order =  mongoose.model('Order');  
 
exports.get = async (data) => { 
    var res = await Order 
        .find({}, 'customer room') 
        .populate('customer','name')
        .populate('items.room', 'numero'); 
    return res;
} 

exports.create = async (data) => { 
    var order = new Order(data); 
    await order.save(); 
}  
