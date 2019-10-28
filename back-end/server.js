const Agenda = require('agenda');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");

const PORT = 4000;

const { mongoPassword, mongoUser,mongoUrl } = require('./env');

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

/*
* Criar uma cópia do arquivo env.default.js na raiz do diretório back-end com o nome de env.js
******************************************** Adicionar env.js no .gitignore
*/
const connectionString = `mongodb+srv://${mongoPassword}:${mongoUser}@${mongoUrl}/agenda?retryWrites=true&w=majority`;
 
const connectionApi = 'http://172.16.255.218:19881/login';
 const agenda = new Agenda({ db: { address: connectionString } });
let accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZWluZm8iLCJleHAiOjE1NzE4NTc2MjN9.qLVFA2obYsuixPt0G7LFxQvcuh5yXBRQUeUiUu_FyIa1XZnHWeiNez6g8OfzTKaGTdcvxW7oTYgic4g9YUOkJQ';
 agenda.define('rebebe novo token', { priority: 'high' }, (job, done) => {
     console.log('Alo teste');
     accessToken = 'TOKEN_DA_API';
     done();
 });
 
(async function() { // IIFE to give access to async/await
   await agenda.start();
   agenda.every('12 hours', 'rebebe novo token');//mudar o tempo p/ 12h
})();
 


mongoose.connect(
  connectionString,
  { useNewUrlParser: true }
);
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT);