const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');

// GET — buscar todos os pedidos
router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.find().sort({ createdAt: -1 });
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar pedidos' });
    }
});

// POST — criar novo pedido
router.post('/', async (req, res) => {
    try {
        const pedido = new Pedido(req.body);
        await pedido.save();
        res.status(201).json(pedido);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao criar pedido' });
    }
});

// PATCH — atualizar status do pedido
router.patch('/:id/status', async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(pedido);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao atualizar status' });
    }
});

module.exports = router;