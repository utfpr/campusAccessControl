const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const acesso = require("./rotas/acesso");
const PORT = 4000;

const { mongoPassword, mongoUser, mongoUrl } = require('./env');

app.use(cors());
app.use(bodyParser.json());

app.use("/acessos", acesso);

/*
* Criar uma cópia do arquivo env.default.js na raiz do diretório back-end com o nome de env.js
******************************************** Adicionar env.js no .gitignore
*/
// const connectionString = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoUrl}/test?retryWrites=true&w=majority`
const connectLocal = 'mongodb://localhost:27018/campusAccessControl';

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