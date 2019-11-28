const express = require('express');
const Router = express.Router();
// const jwt = require('jsonwebtoken');
const moment = require('moment');

const Acesso = require("../schemas/access.model");

//Rotas:
//Criar acesso: '/criarAcesso'
//Atualizar acesso: '/atualizarAcesso'
//Acessos por aluno: '/acessosDoAluno'
//Acessos do dia: '/acessosDeHoje'
//Fechar acesso: '/fecharAcesso'

//Criar acesso
Router.post('/criarAcesso', (req, res) => {
  const {
    descricao, responsavel, horario, data, sala, ra
  } = req.body;

  const novoAcesso = {};
  novoAcesso.descricao = descricao;
  novoAcesso.responsavel = responsavel;
  novoAcesso.horario = horario;
  novoAcesso.data = data;
  novoAcesso.completo = false;
  novoAcesso.sala = sala;
  novoAcesso.ra = ra;
  novoAcesso.justificativa = justificativa;
  novoAcesso.status = solicitado;

  Acesso.create(novoAcesso, (err, acesso) => {
    if (err) {
      console.log(err);
      res.status(400).send('Não foi possível solicitar o acesso \n');
    }
    res.status(200).json(acesso);
  });
});

//Atualizar acesso
Router.put('/atualizarAcesso', (req, res) => {
  Acesso.findOne({ _id: req.body.id }, function (err, acesso) {
    if (!acesso) {
      res.status(404).send('Acesso não encontrado \n');
    } else {
      acesso.descricao = req.body.descricao ? req.body.descricao : acesso.descricao;
      acesso.responsavel = req.body.responsavel ? req.body.responsavel : acesso.responsavel;
      acesso.horario = req.body.horario ? req.body.horario : acesso.horario;
      acesso.data = req.body.data ? req.body.data : acesso.data;
      acesso.completo = req.body.completo ? req.body.completo : acesso.completo;
      acesso.sala = req.body.sala ? req.body.sala : acesso.sala;
      acesso.ra = req.body.ra ? req.body.ra : acesso.ra;
      acesso.justificativa = req.body.justificativa ? req.body.justificativa : acesso.justificativa;
      acesso.status = req.body.status ? req.body.status : acesso.status;

      Acesso.save((err, acesso) => {
        if (err) {
          console.log(err);
          res.status(400).send('Erro ao atualizar o acesso \n', err);
        }
        res.status(200).json(acesso);
      });
    }
  });
});

//Acessos por aluno
Router.get('/acessosDoAluno/:ra', (req, res) => {
  let raAluno = req.body.ra;
  Acesso.find({ ra: raAluno }, (err, acesso) => {
    if (err) {
      console.log(err);
      res.status(400).send('Não foi possível encontrar os acessos deste aluno \n');
    }
    res.status(200).json(acesso);
  });
});

//Acessos do dia
Router.get('/acessosDeHoje', (req, res) => {
  //datacliente = moment(datacliente).format("YYYY-MM-DD");  // 10/18/2019  ] 
  //moment(datacliente).subtract(01, 'months')
  console.log(moment());
  Acesso.find({ data:  moment()  }, (err, acesso) => {
    if (err) {
      console.log(err);
      res.status(400).send('Não existem acessos para o dia de hoje\n');
    }
    res.status(200).json(acesso);
  });
});

//Fechar acesso
Router.get('/fecharAcesso', (req, res) => {
  Acesso.findById(req.body.id, (err, acesso) => {
    if (!acesso) {
      res.status(404).send('Acesso não encontrado \n');
    } else {
      acesso.completo = true;
      acesso.status = "Fechado";

      Acesso.save((err, acesso) => {
        if (err) {
          console.log(err);
          res.status(400).send('Erro ao fechar o acesso \n', err);
        }
        res.status(200).json(acesso);
      });
    }
  });
});

// class AccessController {
//   async Insert(req, res) {
//     let acesso = new Access(req.body);
//     acesso
//       .save()
//       .then(res => {
//         res.status(200).json({ acesso: "acesso added successfully" });
//       })
//       .catch(err => {
//         res.status(400).send("adding new acesso failed");
//       });
//   }
// async UpdateDirec(req, res) {
//   Access.findById(req.params.id, function (err, acesso) {
//     if (!acesso) res.status(404).send("data is not found");
//     else acesso.status = req.body.status;
//     acesso.justificativa = req.body.justificativa;
//     acesso
//       .save()
//       .then(res => {
//         res.json("acesso updated");
//       })
//       .catch(err => {
//         res.status(400).send("Update not possible");
//       });
//   });
// }

// async Update(req, res) {
//   Access.findById(req.params.id, async function (err, acesso) {
//     if (!acesso) res.status(404).send("data is not found");
//     else acesso.descricao = req.body.descricao;
//     acesso.responsavel = req.body.responsavel;
//     acesso.horario = req.body.horario;
//     acesso.data = req.body.data;
//     acesso.prioridade = req.body.prioridade;
//     acesso.status = req.body.status;
//     acesso.completo = req.body.completo;

//     acesso
//       .save()
//       .then(res => {
//         res.json("Acesso updated");
//       })
//       .catch(err => {
//         res.status(400).send("Update not possible");
//       });
//   });
// }

// async Insert(req, res) {
//   let acesso = new Access(req.body);
//   acesso
//     .save()
//     .then(res => {
//       res.status(200).json({ acesso: "acesso added successfully" });
//     })
//     .catch(err => {
//       res.status(400).send("adding new acesso failed");
//     });
// }

// async FindId(req, res) {
//   let iduser = req.params.id;
//   Access.find({ acesso_userid: iduser }, function (err, acesso) {
//     res.json(acesso);
//   });
// }

// async FilterTag(req, res) {
//   let tag = req.params.tag;
//   Access.find({ status: tag }, function (err, acesso) {
//     res.json(acesso);
//   });
// }

// async GetById(req, res) {
//   let id = req.params.id;
//   Access.findById(id, function (err, acesso) {
//     res.json(acesso);
//   });
// }

// async GetAll(req, res) {
//   Access.find({ status: "Solicitado" }, function (err, acessos) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(acessos);
//     }
//   });
// }
// }

module.exports = Router;
