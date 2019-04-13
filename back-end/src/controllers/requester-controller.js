'use strict';  
    

// validation 
const ValidationContract = require('../validators/fluent-validator');
// repository of product 
const repository = require('../repositories/requester-repository'); 
 

//getters functions (sync)

// get/products
exports.get = async (req, res, next) =>{ 
    try {
        var data = await repository.get(); 
        res.render('show.ejs', { data: await repository.get() })
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar sua requisição'
        });
    }    
};
 
// get/products/horario
exports.getByHorario = async (req, res, next) =>{ 
    try {
        var data = await repository.getByHorario(req, params, horario); 
        res.status(200).send(data);
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar sua requisição'
        });
    }    
}; 
 
// get/products/datas/data
exports.getByData = async (req, res, next) =>{ 
    try {
        const data = await repository.getByData(req.params.tag); 
        res.status(200).send(data);
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar sua requisição'
        });
    }    
}; 


// get/products/admin/numero(f001)
exports.getByNumero = async (req, res, next) =>{ 
    try {
        var data = await repository.getByNumero(req.params.numero); 
        res.status(200).send(data);
    } catch (e) { 
        res.status(500).send({ 
            message: 'Falha ao processar sua requisição'
        });
    }    
}; 
 

// create / set / update / delete  

//post - create
exports.post = async(req, res, next) => {  
    let contract = new ValidationContract(); 
    contract.hasMinLen(req.body.numero, 4, 'O numero da sala deve conter pelo menos 4 caracteres = f001') 
    contract.hasMinLen(req.body.horario, 4, 'O horario deve conter pelo menos 4 caracteres') 
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres') 
 
    // if data is valid
    if (!contract.isValid()){ 
        res.status(400).send(contract.errors()).end(); 
        return;
    }  
    try{ 
        await repository.create(req.body); 
        res.status(201).send({ 
            message: 'Requisição Cadastrada com sucesso!' 
        });
    } catch (e){ 
        res.status(500).send({ 
            message: 'Falha ao processar a requisição'
        })
    }
}; 
 
// put - set
exports.put = (req, any, next) => { 
    const numero = req.params.numero; 
    res.status(200).send({ 
        numero: numero, 
        item: req.body 
    });     
}; 
 

//put- update request
exports.put = (req, res, next) => {   
    // Product -> function to find by id params and update 
    // update ./port/request/id 
    repository  
        .update(req.params.numero, req.body)
        .then(x=>{ 
            res.status(201).send({ 
                message: 'Sala atualizado com sucesso!' 
            });
        }).catch(e=>{ 
            res.status(400).send({ 
                message: 'Sala não atualizado!',  
                data: e 
            });
        });  
}; 
 
// delete product  
exports.delete = (req, res, next) => {  
    // use function findOneAndRemove of Product  
    // and print mensage with sucess or error  
    repository.delete(req.params.id) 
        .then(x=>{ 
            res.status(200).send({ 
                message: 'Requisição removido com sucesso!' 
            });
        }).catch(e=>{ 
            res.status(400).send({ 
                message: 'requisição não removida!',  
                data: e 
            });
        });  
};  
