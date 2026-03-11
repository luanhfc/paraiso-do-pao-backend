const express = require('express');
const router = express.Router();
const PedidoService = require('../services/pedidoService');

router.get('/', async (req, res) => {
    try {
        const pedidos = await PedidoService.listarTodos();
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const pedido = await PedidoService.criar(req.body);
        res.status(201).json(pedido);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

router.patch('/:id/status', async (req, res) => {
    try {
        const pedido = await PedidoService.atualizarStatus(req.params.id, req.body.status);
        res.json(pedido);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

module.exports = router;