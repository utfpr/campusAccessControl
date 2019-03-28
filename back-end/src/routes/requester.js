'use strict'; 
  
// control and route of product 

const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/requester-controller'); 

// get functions (by id and data)
router.get('/', controller.get); 
router.get('/:bloco', controller.getByHorario);  
router.get('/admin/:numero', controller.getByNumero);  
router.get('/datas/:data', controller.getByData); 

// post, put and delete (create, update and delete)
router.post('/', controller.post); 
router.put('/:numero', controller.put); 
router.delete('/', controller.delete); 

module.exports = router;
