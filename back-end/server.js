const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router(); 
const userRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');
let User = require('./user.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://balta:balta@cluster0-zflci.azure.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
}) 
 
userRoutes.route('/').get( async function(req, res) {
    Todo.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});
 

userRoutes.route('/:id').get(async function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, user) {
        res.json(todo);
    });
});
 

userRoutes.route('/add').post(async function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(todo => {
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
           
            user.save().then(todo => {
                res.json('User updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});




todoRoutes.route('/').get( async function(req, res) {
    Todo.find(function(err, todos) {
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

todoRoutes.route('/update/:id').post(async function(req, res) {
    Todo.findById(req.params.id, async function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible; 
            todo.todo_horario = req.body.todo_horario; 
            todo.todo_date = req.body.todo_date;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/todos', todoRoutes);
app.use('/users', userRoutes); 

app.listen(PORT, async function() {
    console.log("Server is running on Port: " + PORT);
});