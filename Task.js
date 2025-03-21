// importa o Mongoose
const mongoose = require("mongoose");

// define o esquema da tarefa
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // título obrigatório
  description: String, // descrição opcional
  status: { type: String, enum: ["A Fazer", "Em Andamento", "Concluído"], default: "A Fazer" }, // status da tarefa
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true }, // referencia ao board
  createdAt: { type: Date, default: Date.now }, // data de criação automatica
});

// exporta o modelo da tarefa
module.exports = mongoose.model("Task", TaskSchema);

