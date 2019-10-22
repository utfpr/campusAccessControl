const Access = require("../schemas/access.model");

class AccessController {
  async UpdateDirec(req, res) {
    Access.findById(req.params.id, function(err, todo) {
      if (!todo) res.status(404).send("data is not found");
      else todo.tags = req.body.todo_tags;
      todo.justificativa = req.body.justificativa;
      todo
        .save()
        .then(todo => {
          res.json("Todo updated");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    });
  }

  async Update(req, res) {
    Access.findById(req.params.id, async function(err, todo) {
      if (!todo) res.status(404).send("data is not found");
      else todo.todo_description = req.body.todo_description;
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_horario = req.body.todo_horario;
      todo.todo_date = req.body.todo_date;
      todo.todo_priority = req.body.todo_priority;
      todo.tags = req.body.todo_tags;
      todo.todo_completed = req.body.todo_completed;

      todo
        .save()
        .then(todo => {
          res.json("Todo updated");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    });
  }

  async Insert(req, res) {
    let todo = new Access(req.body);
    todo
      .save()
      .then(todo => {
        res.status(200).json({ todo: "todo added successfully" });
      })
      .catch(err => {
        res.status(400).send("adding new todo failed");
      });
  }

  async FindId(req, res) {
    let iduser = req.params.id;
    Access.find({ todo_userid: iduser }, function(err, todo) {
      res.json(todo);
    });
  }

  async FilterTag(req, res) {
    let tag = req.params.tag;
    Access.find({ tags: tag }, function(err, todo) {
      res.json(todo);
    });
  }

  async GetById(req, res) {
    let id = req.params.id;
    Access.findById(id, function(err, todo) {
      res.json(todo);
    });
  }

  async GetAll(req, res) {
    Access.find({ tags: "Solicitado" }, function(err, todos) {
      if (err) {
        console.log(err);
      } else {
        res.json(todos);
      }
    });
  }
}

module.exports = new AccessController();
