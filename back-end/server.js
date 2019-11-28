const Agenda = require('agenda');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

const acesso = require("./app/controllers/AccessController");
const { storeToken } = require("./auth");
const PORT = 4000;

const { mongoPassword, mongoUser, mongoUrl, usernameAPI, passwordAPI } = require('./env');

app.use(cors());
app.use(bodyParser.json());

app.use("acessos/", acesso);

/*
* Criar uma cópia do arquivo env.default.js na raiz do diretório back-end com o nome de env.js
******************************************** Adicionar env.js no .gitignore
*/
// const connectionString = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoUrl}/agenda?retryWrites=true&w=majority`;
// const connectionString = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoUrl}/test?retryWrites=true&w=majority`
const connectLocal = 'mongodb://localhost:27017/campusAccessControl';
// const connectionApi = 'http://172.16.255.218:19881/login';

mongoose
  .connect(connectLocal, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(error => {
    console.log('Connection failed!');
    console.log(error);
  });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

let agenda = new Agenda({
  db: {
    address: connectLocal,
    collection: 'jobs',
    options: {
      useNewUrlParser: true
    }
  }
});

agenda.define('rebebe novo token', (job, done) => {
  console.log('Fazendo requisição\n');
  resquestAPI();
  // accessToken = 'TOKEN_DA_API';
  done();
  console.log("Requisição completa\n");
});

(async function () { // IIFE to give access to async/await
  await agenda.start();
  agenda.every('5 seconds', 'rebebe novo token');//mudar o tempo p/ 12h
})();

function resquestAPI() {
  axios
    .post('http://172.16.255.218:19881/login', { usernameAPI, passwordAPI })
    .then((res) => {
      console.log("res.data: ", res.data);
      console.log("res.data.Authorization: ", res.data.Authorization);
      storeToken(res.data.Authorization);
    }).catch((err) => {
      console.log(err);
    })
}

