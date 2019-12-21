const express = require('express');
const Router = express.Router();
// const jwt = require('jsonwebtoken');
const moment = require('moment');

const Acesso = require("../model/acesso");

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
  novoAcesso.sala = sala;
  novoAcesso.ra = ra;
  novoAcesso.completo = false;
  novoAcesso.justificativa = '';
  novoAcesso.status = 'solicitado';

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
    } else if(acesso){
      acesso.descricao = req.body.descricao ? req.body.descricao : acesso.descricao;
      acesso.responsavel = req.body.responsavel ? req.body.responsavel : acesso.responsavel;
      acesso.horario = req.body.horario ? req.body.horario : acesso.horario;
      acesso.data = req.body.data ? req.body.data : acesso.data;
      acesso.completo = req.body.completo ? req.body.completo : acesso.completo;
      acesso.sala = req.body.sala ? req.body.sala : acesso.sala;
      acesso.ra = req.body.ra ? req.body.ra : acesso.ra;
      acesso.justificativa = req.body.justificativa ? req.body.justificativa : acesso.justificativa;
      acesso.status = req.body.status ? req.body.status : acesso.status;

      acesso.save((err, acesso) => {
        if (err) {
          console.log(err);
          res.status(400).send('Erro ao atualizar o acesso \n', err);
        }
        res.status(200).json(acesso);
      });
    }
  });
});

//Acessos
Router.get('/acessos', (req, res) => {
  Acesso.find((err, acesso) => {
    if (err) {
      console.log(err);
      res.status(400).send('Não existem acessos\n');
    }
    res.status(200).json(acesso);
  });
});

//Acessos por aluno
Router.get('/acessosDoAluno', (req, res) => {
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
  Acesso.find({ data:  {$gte: new Date(new Date().setHours(00, 00, 00)),
    $lt: new Date(new Date().setHours(23, 59, 59))}  }, (err, acesso) => {
    if (err) {
      console.log(err);
      res.status(400).send('Não existem acessos para o dia de hoje\n');
    }
    res.status(200).json(acesso);
  });
});

//Fechar acesso
Router.put('/fecharAcesso', (req, res) => {
  Acesso.findById(req.body.id, (err, acesso) => {
    if (!acesso) {
      res.status(404).send('Acesso não encontrado \n');
    } else {
      acesso.completo = true;

      acesso.save((err, acesso) => {
        if (err) {
          console.log(err);
          res.status(400).send('Erro ao fechar o acesso \n', err);
        }
        res.status(200).json(acesso);
      });
    }
  });
});

Router.put('/verificarAcesso', (req, res) => {
  Acesso.findById(req.body.id, (err, acesso) => {
    if (!acesso) {
      res.status(404).send('Acesso não encontrado \n');
    } else {
      acesso.justificativa = req.body.justificativa;
      acesso.status = req.body.status;

      acesso.save((err, acesso) => {
        if (err) {
          console.log(err);
          res.status(400).send('Erro ao fechar o acesso \n', err);
        }
        res.status(200).json(acesso);
      });
    }
  });
});

module.exports = Router;