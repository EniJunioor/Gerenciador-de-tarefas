const express = require("express");
const router = express.Router();
const Board = require("../models/Board");

// criar um novo quadro
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

// lista todos os quadros
router.get("/", async (req, res) => {
  try {
    // busca todos os quadros no banco
    const boards = await Board.find();

    // se não ter quadros, retorna um erro informando que nenhum quadro foi encontrado
    if (boards.length === 0) {
      return res.status(404).json({ message: "Nenhum quadro encontrado" });
    }

    // retorna os quadros encontrados no formato JSON
    res.json(boards); 
  } catch (err) {
    // se ter um erro ao buscar os quadros, retorna um erro 500 detalhado
    res.status(500).json({ error: `Erro ao listar os quadros: ${err.message}` });
  }
});

// editar um quadro
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

// excluir um quadro
router.delete("/:id", async (req, res) => {
  try {
    // encontra e deleta o quadro pelo ID
    const board = await Board.findByIdAndDelete(req.params.id);

    // se o quadro não for encontrado para exclusão, retorna erro 404
    if (!board) {
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