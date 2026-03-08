const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// GET — buscar todos os produtos
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.find({ disponivel: true });
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar produtos' });
    }
});

// GET — buscar produtos por categoria
router.get('/categoria/:categoria', async (req, res) => {
    try {
        const produtos = await Produto.find({
            categoria: req.params.categoria,
            disponivel: true
        });
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar categoria' });
    }
});

// POST — cadastrar novo produto
router.post('/', async (req, res) => {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).json(produto);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao cadastrar produto' });
    }
});

// DELETE — remover produto
router.delete('/:id', async (req, res) => {
    try {
        await Produto.findByIdAndDelete(req.params.id);
        res.json({ mensagem: 'Produto removido com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao remover produto' });
    }
});

module.exports = router;