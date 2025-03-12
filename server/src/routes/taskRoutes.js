const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// criar uma nova tarefa
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar a tarefa" });
  }
});

// listar todas as tarefas de um quadro
router.get("/:boardId", async (req, res) => {
  const tasks = await Task.find({ boardId: req.params.boardId });
  res.json(tasks);
});

// editar uma tarefa
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar a tarefa" });
  }
});

// excluir uma tarefa
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir a tarefa" });
  }
});

module.exports = router;