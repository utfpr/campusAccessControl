'use strict'; 
 
const express = require('express');  
const bodyParser = require('body-parser'); 
 
// db
const mongoose = require('mongoose');  

// config 
const config = require('./config');


const app = express(); 
const router = express.Router();  
 
// connect with moongose database
mongoose.connect(config.connectionString)
 

// load schemas (models) of database
const Customer = require('./models/customer'); 
const Order = require('./models/order');
const Requester = require('./models/requester'); 

// load routes 
const indexRoute = require('./routes/index'); 

const customerRoute = require('./routes/customer');
const requesterRoute = require('./routes/requester');
const orderRoute = require('./routes/order');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));

 
// index route
app.use('/', indexRoute);    

// product route 
app.use('/customers', customerRoute); 
app.use('/orders', orderRoute); 
app.use('/requesters', requesterRoute);

module.exports = app; 
