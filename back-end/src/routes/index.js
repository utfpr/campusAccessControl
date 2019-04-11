'use stric'; 
 
const express = require('express'); 
const router = express.Router(); 
 
router.get('/', (req, res, next) =>{ 
    res.render('index.ejs')
}); 
 
router.get('/access', (req, res, next) =>{ 
    res.render('requester.ejs')
});
module.exports = router;