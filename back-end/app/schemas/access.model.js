const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Access = new Schema({
  todo_description: {
    type: String,
    trim: true
  },
  todo_responsible: {
    type: String,
    trim: true
  },
  todo_horario: {
    type: String,
    trim: true
  },
  todo_date: {
    type: String,
    trim: true
  },
  todo_priority: {
    type: String,
    trim: true
  },
  todo_completed: {
    type: Boolean,
    default: false
  },
  todo_room: {
    type: String,
    trim: true,
    required: true
  },
  todo_userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  justificativa: {
    type: String,
    trim: true
  },
  tags: [
    {
      type: String,
      required: true,
      trim: true,
      default: "Solicitado"
    }
  ]
});

module.exports = mongoose.model("Access", Access);
