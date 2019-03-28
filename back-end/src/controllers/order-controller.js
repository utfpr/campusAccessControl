'use strict';  
 
// validation 
const ValidationContract = require('../validators/fluent-validator');
// repository of order 
const repository = require('../repositories/order-repository'); 
  
const guid = require('guid'); 



// get
exports.get = async (req, res, next) =>{ 
    try {
        var data = await repository.get(); 
        res.status(200).send(data);
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar sua requisição'
        });
    }    
};
  

//post - create
exports.post = async(req, res, next) => {   
    try { 
        await repository.create({ 
            customer: req.body.customer, 
            items: req.body.items
        });
        res.status(201).send({ 
            message: 'Pedido Cadastrado com sucesso!' 
        });
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar a requisição'
        })
    }
}; 