const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AcessoSchema = new Schema({
  descricao: {
    type: String,
    trim: true,
    required: true
  },
  responsavel: {
    type: String,
    trim: true,
    required: true
  },
  horario: {
    type: String,
    trim: true,
    required: true
  },
  data: {
    type: Date,
    trim: true,
    required: true
  },
  completo: {
    type: Boolean,
    default: false
  },
  sala: {
    type: String,
    trim: true,
    required: true
  },
  ra: {
    type: String,
    required: true
  },
  justificativa: {
    type: String,
    trim: true
  },
  status:{
    type: String,
    required: true,
    default: "solicitado"
  }
}, { timestamps: true });

const Acesso = mongoose.model('Acesso', AcessoSchema, 'acessos');

module.exports = Acesso;
