const express = require("express");
const router = express.Router();
const Board = require("../../Board.js");

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Gerenciamento de Quadros
 */

/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: Criar um novo quadro
 *     tags: [Boards]
 *     description: Cria um novo quadro com o título fornecido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Meu Quadro"
 *     responses:
 *       201:
 *         description: Quadro criado com sucesso
 *       400:
 *         description: Título é obrigatório
 *       500:
 *         description: Erro interno ao criar o quadro
 */

// Criar um novo quadro
router.post("/", async (req, res) => {
  try {
    // vai verificar se o título foi fornecido na requisição, caso contrário retorna um erro 400
    if (!req.body.title) {
      return res.status(400).json({ error: "Título é obrigatório" });
    }
    // cria um novo documento Board com o título enviado no corpo da requisição
    const board = new Board({ title: req.body.title });
    // salva o quadro no banco
    await board.save();
    // retorna o quadro criado com status 201, indicando que foi criado com sucesso
    res.status(201).json(board);
  } catch (err) {
    // se acontecer um erro,vai retorna o status 500 com uma mensagem detalhada do erro
    res.status(500).json({ error: `Erro ao criar o quadro: ${err.message}` });
  }
});

/**
 * @swagger
 * /api/boards:
 *   get:
 *     summary: Lista todos os quadros
 *     tags: [Boards]
 *     description: Retorna todos os quadros cadastrados
 *     responses:
 *       200:
 *         description: Lista de quadros encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "660faa3d4b8e3c001b57f6ab"
 *                   title:
 *                     type: string
 *                     example: "Meu Quadro"
 *       404:
 *         description: Nenhum quadro encontrado
 *       500:
 *         description: Erro interno ao listar os quadros
 */

// Lista todos os quadros
router.get("/", async (req, res) => {
  try {
    // busca todos os quadros no banco
    const boards = await Board.find();
    if (boards.length === 0) {
      // se não ter quadros, retorna um erro informando que nenhum quadro foi encontrado
      return res.status(404).json({ message: "Nenhum quadro encontrado" });
    }
    // retorna os quadros encontrados no formato JSON
    res.json(boards);
  } catch (err) {
    // se ter um erro ao buscar os quadros, retorna um erro 500 detalhado
    res.status(500).json({ error: `Erro ao listar os quadros: ${err.message}` });
  }
});

/**
 * @swagger
 * /api/boards/{id}:
 *   put:
 *     summary: Atualizar um quadro
 *     tags: [Boards]
 *     description: Atualiza o título de um quadro existente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do quadro a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Novo Título do Quadro"
 *     responses:
 *       200:
 *         description: Quadro atualizado com sucesso
 *       400:
 *         description: Título é obrigatório
 *       404:
 *         description: Quadro não encontrado
 *       500:
 *         description: Erro interno ao atualizar o quadro
 */


// Editar um quadro
router.put("/:id", async (req, res) => {
  try {
    // vai verificar se o título foi enviado na requisição, caso contrário retorna erro
    if (!req.body.title) {
      return res.status(400).json({ error: "Título é obrigatório" });
    }
    // encontra o quadro pelo ID e atualiza o título
    const board = await Board.findByIdAndUpdate(
      req.params.id,  // ID do quadro na URL
      { title: req.body.title },  // Novo título
      { new: true }  // Retorna o quadro atualizado
    );

    // se não encontrar o quadro, retorna erro 404 com mensagem
    if (!board) {
      return res.status(404).json({ message: "Quadro não encontrado" });
    }
    // retorna o quadro atualizado com o novo título
    res.json(board);
  } catch (err) {
    // se tiver um erro ao atualizar o quadro, retorna erro 500 detalhado
    res.status(500).json({ error: `Erro ao atualizar o quadro: ${err.message}` });
  }
});

/**
 * @swagger
 * /api/boards/{id}:
 *   delete:
 *     summary: Excluir um quadro
 *     tags: [Boards]
 *     description: Remove um quadro do sistema pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do quadro a ser removido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quadro removido com sucesso
 *       404:
 *         description: Quadro não encontrado
 *       500:
 *         description: Erro interno ao excluir o quadro
 */

// Excluir um quadro
router.delete("/:id", async (req, res) => {
  try {
    // encontra e deleta o quadro pelo ID
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) {
      // se o quadro não for encontrado para exclusão, retorna erro 404
      return res.status(404).json({ message: "Quadro não encontrado" });
    }
    // retorna uma mensagem de sucesso informando que o quadro foi removido
    res.json({ message: "Quadro removido com sucesso" });
  } catch (err) {
    // se ocorrer um erro ao deletar o quadro, retorna erro 500 detalhado
    res.status(500).json({ error: `Erro ao excluir o quadro: ${err.message}` });
  }
});

module.exports = router;
