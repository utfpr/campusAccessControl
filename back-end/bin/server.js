'use strict'  
const app = require('../src/app');
const http = require('http'); 
const debug = require('debug')('balta:server'); 
const express = require('express'); 
  
// port of app
const port = normalizePort(process.env.PORT || '3001'); 
app.set('port', port); 
  
// server and route 
const server = http.createServer(app); 
const router = express.Router(); 
 
var route = router.get('/', (req, res, next) => { 
    res.status(200).send({ 
        title: "Node Store", 
        version: "0.0.1" 

    }); 
}); 
app.use('/', route);  
 
//listen port  

server.listen(port);  
server.on('error', onError); 
 
// show port
console.log('API RODANDO na porta '+ port);  
  

// functions of connection port 

function normalizePort(val){ 
    const port = parseInt(val,10); 
     
    if (isNaN(port)){ 
        return val;
    } 
    if (port >= 0){ 
        return port;
    } 
    return false;
} 

 
function onError(error){ 
    if(error.syscall !== 'listen'){ 
        throw error;
    } 
    const bind = typeof port === 'string' ? 
        'Pipe' + port : 
        'Port' + port; 
    switch (error.code){ 
        case 'EACCES' : 
            console.error(bind + 'require elevate privileges'); 
            process.exit(1); 
            break; 
        case 'EADDRINUSE': 
            console.error(bind + 'is already in use'); 
            process.exit(1); 
            break; 
        default: 
            throw error; 
                    
    }    
} 

function onListening(){ 
    const addr = server.address(); 
    const bind = typeof addr === 'string' 
        ? 'pipe' + addr 
        : 'port' + addr.port; 
    debug('Listening on ' + bind);      
}
 

