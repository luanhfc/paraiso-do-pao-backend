const express = require('express');
const router = express.Router();
const ProdutoService = require('../services/ProdutoService');

router.get('/', async (req, res) => {
    try {
        const produtos = await ProdutoService.listarTodos();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

router.get('/categoria/:categoria', async (req, res) => {
    try {
        const produtos = await ProdutoService.listarPorCategoria(req.params.categoria);
        res.json(produtos);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const produto = await ProdutoService.cadastrar(req.body);
        res.status(201).json(produto);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const resultado = await ProdutoService.remover(req.params.id);
        res.json(resultado);
    } catch (err) {
        res.status(404).json({ erro: err.message });
    }
});

module.exports = router;