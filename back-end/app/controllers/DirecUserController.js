const DirecUser = require("../schemas/direcuser.model");

class DirecUserController {
  async Index(req, res) {
    DirecUser.find(function(err, users) {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    });
  }

  async Insert(req, res) {
    let direcuser = new DirecUser(req.body);
    direcuser
      .save()
      .then(direcuser => {
        res.status(200).json({ direcuser: "admuser added successfully" });
      })
      .catch(err => {
        res.status(400).send("adding new user failed");
      });
  }
}

module.exports = new DirecUserController();
