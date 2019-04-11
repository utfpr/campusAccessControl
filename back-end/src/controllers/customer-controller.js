'use strict';  
 
// validation 
const ValidationContract = require('../validators/fluent-validator');
// repository of customer 
const repository = require('../repositories/customer-repository'); 
  

//post - create
exports.post = async(req, res, next) => {  
    let contract = new ValidationContract(); 
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres'); 
    contract.isEmail(req.body.email, 'O email é inválido') ;
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres'); 
 
    // if data is valid
    if (!contract.isValid()){ 
        res.status(400).send(contract.errors()).end(); 
        return;
    } 
    try { 
        await repository.create({ 
            name: req.body.name, 
            email: req.body.email, 
            password: req.body.password, 
            type: req.body.type 
        }); 
        res.render('requester.ejs')
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar a requisição'
        })
    }
}; 