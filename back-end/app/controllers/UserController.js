const User = require("../schemas/user.model");

class UserController {
  async Delete(req, res) {
    User.findByIdAndDelete(req.params.id, async function(err, user) {
      if (!user) res.status(404).send("data is not found");
      else
        user
          .delete()
          .then(user => {
            res.json("User deleted");
          })
          .catch(err => {
            res.status(400).send("Delete not possible");
          });
    });
  }

  async UpdateById(req, res) {
    User.findById(req.params.id, async function(err, user) {
      if (!user) res.status(404).send("data is not found");
      else user.user_name = req.body.user_name;
      user.user_email = req.body.user_email;
      user.user_password = req.body.user_password;
      user.user_type = req.body.user_type;
      user.user_completed = req.body.user_completed;

      user
        .save()
        .then(user => {
          res.json("User updated");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    });
  }

  async Insert(req, res) {
    let user = new User(req.body);
    user
      .save()
      .then(user => {
        res.status(200).json({ user: "user added successfully" });
      })
      .catch(err => {
        res.status(400).send("adding new user failed");
      });
  }

  async GetByEmail(req, res) {
    let emailuser = req.params.email;
    User.find({ user_email: emailuser }, function(err, todo) {
      res.json(todo);
    });
  }

  async GetById(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
      res.json(user);
    });
  }

  async Index(req, res) {
    User.find(function(err, users) {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    });
  }
}

module.exports = new UserController();
