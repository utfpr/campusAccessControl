const express = require("express");
const DirecUserController = require("./app/controllers/DirecUserController");
const AccessController = require("./app/controllers/AccessController");
const UserController = require("./app/controllers/UserController");

const routes = express.Router();

routes.get("/usersdirec", DirecUserController.Index);
routes.put("/usersdirec/add", DirecUserController.Insert);
//////////////////////////////////////////////////////////////////
routes.put("/todos/updatedirec/:id", AccessController.UpdateDirec);
routes.put("/todos/update/:id", AccessController.Update);
routes.post("/todos/add", AccessController.Insert);
routes.get("/todos/user/:id", AccessController.FindId);
routes.get("/todos/filtro/:tag", AccessController.FilterTag);
routes.get("/todos/:id", AccessController.GetById);
routes.get("/todos", AccessController.GetAll);
/////////////////////////////////////////////////////////////////////

routes.delete("/users/delete/:id", UserController.Delete);
routes.post("/users/update/:id", UserController.UpdateById);
routes.post("/users/add", UserController.Insert);
routes.get("/users/getuser/:email", UserController.GetByEmail);
routes.get("/users/:id", UserController.GetById);
routes.get("/users", UserController.Index);

module.exports = routes;
