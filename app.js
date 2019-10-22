const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const routes = require("./back-end/routes");

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

mongoose.connect(
  "mongodb+srv://testeApp:<juci2406gui>@cluster0-dmtgp.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT);
