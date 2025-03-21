const express = require("express");
const router = express.Router();
const Task = require("../../Task.js");

/**
 * @swagger
 * tags:
 *   - name: Tarefas
 *     description: Endpoints para gerenciamento de tarefas
 */

/**
 * @swagger
 * /api/tarefas:
 *   post:
 *     summary: Criar uma nova tarefa
 *     description: Adiciona uma nova tarefa ao banco de dados
 *     tags:
 *       - Tarefas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               boardId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       500:
 *         description: Erro ao criar a tarefa
 */
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar a tarefa" });
  }
});

/**
 * @swagger
 * /api/tarefas/{boardId}:
 *   get:
 *     summary: Listar todas as tarefas de um quadro
 *     description: Retorna todas as tarefas associadas a um determinado quadro
 *     tags:
 *       - Tarefas
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do quadro
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 */
router.get("/:boardId", async (req, res) => {
  const tasks = await Task.find({ boardId: req.params.boardId });
  res.json(tasks);
});

/**
 * @swagger
 * /api/tarefas/{id}:
 *   put:
 *     summary: Editar uma tarefa
 *     description: Atualiza uma tarefa existente com os novos dados fornecidos
 *     tags:
 *       - Tarefas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa a ser editada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       500:
 *         description: Erro ao atualizar a tarefa
 */
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar a tarefa" });
  }
});

/**
 * @swagger
 * /api/tarefas/{id}:
 *   delete:
 *     summary: Excluir uma tarefa
 *     description: Remove uma tarefa do banco de dados
 *     tags:
 *       - Tarefas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa a ser excluída
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       500:
 *         description: Erro ao excluir a tarefa
 */
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir a tarefa" });
  }
});

module.exports = router;