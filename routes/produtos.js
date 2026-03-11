const express = require('express');
const router = express.Router();
const ProdutoService = require('../services/produtoService');
const Produto = require('../models/produto');

router.get('/', async (req, res) => {
    try {
        const usuario = req.query.idade ? { idade: Number(req.query.idade) } : null;
        const produtos = await ProdutoService.listarTodos(usuario);
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

router.get('/categoria/:categoria', async (req, res) => {
    try {
        // pega a idade da query string ex: /api/produtos/categoria/paes?idade=16
        const usuario = req.query.idade ? { idade: Number(req.query.idade) } : null;
        const produtos = await ProdutoService.listarPorCategoria(req.params.categoria, usuario);
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

// rota temporária para corrigir produtos sem campo restrito
router.patch('/corrigir-restrito', async (req, res) => {
    try {
        await Produto.updateMany(
            { restrito: { $exists: false } },
            { $set: { restrito: false } }
        );
        res.json({ mensagem: 'Produtos corrigidos com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;