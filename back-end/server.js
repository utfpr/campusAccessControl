const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router(); 
const userRoutes = express.Router(); 
const direcuserRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');
let User = require('./user.model');
let DirecUser = require('./direcuser.model'); 

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://bianca:rio@progapp-r2oat.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
}) 
  

// CRUD Users
userRoutes.route('/').get( async function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
 

userRoutes.route('/:id').get(async function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});
  

userRoutes.route('/getuser/:email').get(async function(req, res) {
    let emailuser = req.params.email;
    User.find({user_email:emailuser}, function(err, todo) {
        res.json(todo);
    });
});

userRoutes.route('/add').post(async function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
}); 

 

userRoutes.route('/update/:id').post(async function(req, res) {
    User.findById(req.params.id, async function(err, user) {
        if (!user)
            res.status(404).send('data is not found');
        else
            user.user_name = req.body.user_name; 
            user.user_email = req.body.user_email;
            user.user_password = req.body.user_password;
            user.user_type = req.body.user_type;
            user.user_completed = req.body.user_completed;
           
            user.save().then(user => {
                res.json('User updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


userRoutes.route('/delete/:id').delete(async function(req, res) {
    User.findByIdAndDelete(req.params.id, async function(err, user) {
        if (!user)
            res.status(404).send('data is not found');
        else
            user.delete().then(user => {
                res.json('User deleted');
            })
            .catch(err => {
                res.status(400).send("Delete not possible");
            });
    });
});


 

// CRUD Access

todoRoutes.route('/').get( async function(req, res) {
    Todo.find({tags:'Solicitado'}, function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(async function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});
 
todoRoutes.route('/filtro/:tag').get(async function(req, res) {
    let tag = req.params.tag;
    Todo.find({tags:tag}, function(err, todo) {
        res.json(todo);
    });
}); 

todoRoutes.route('/user/:id').get(async function(req, res) {
    let iduser = req.params.id;
    Todo.find({todo_userid:iduser}, function(err, todo) {
        res.json(todo);
    });
});
 

todoRoutes.route('/add').post(async function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').put(async function(req, res) {
    Todo.findById(req.params.id, async function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible; 
            todo.todo_horario = req.body.todo_horario; 
            todo.todo_date = req.body.todo_date;
            todo.todo_priority = req.body.todo_priority;  
            todo.tags = req.body.todo_tags;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
   

todoRoutes.route('/updatedirec/:id').put(async function(req, res) {
    Todo.findById(req.params.id, async function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else 
            todo.tags = req.body.todo_tags; 
            todo.justificativa = req.body.justificativa;
            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

// Admin User Routes

direcuserRoutes.route('/add').post(async function(req, res) {
    let direcuser = new DirecUser(req.body);
    direcuser.save()
        .then(direcuser => {
            res.status(200).json({'direcuser': 'admuser added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
}); 

direcuserRoutes.route('/').get( async function(req, res) {
    DirecUser.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
 

app.use('/todos', todoRoutes);
app.use('/users', userRoutes); 
app.use('/usersdirec', direcuserRoutes); 

app.listen(PORT, async function() {
    console.log("Server is running on Port: " + PORT);
});
