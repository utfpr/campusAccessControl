'use strict'; 
const mongoose = require('mongoose'); 
const Requester =  mongoose.model('Requester');  
 
// every functions are async! 
exports.get = async () => {  
    const res = await Requester.find({ 
            active:true  
        }, 'numero horario description responsible state datas'); 
    return res;    
} 
exports.getByHorario = async(horario) => { 
    const res = await Requester 
        .findOne({  
            horario: horario,
            active:true 
        }, 'numero customer horario description active datas')  
    return res;    
} 
exports.getByNumero = async (numero) => { 
    const res = await Requester 
        .findByNumero(numero); 
    return res;     
} 
exports.getByData = async (data) => { 
    const res = await Requester 
        .find({ 
            datas: data, 
            active: true 
        }, 'numero customer horario description active datas') 
    return res;    
}  

exports.create = async (data) => { 
    var requester = new Requester(data); 
    await requester.save(); 
} 
exports.update = async(numero,data) => { 
    await Requester 
    .findByNumeroAndUpdate(numero, { 
        $set: {  
            // can update the place and time of request
            numero: data.numero, 
            horario: data.horario 
        }
    });
} 
exports.delete = async(id) => { 
    await Requester 
        .findOneAndRemove(id);
}