const Pedido = require('../models/pedido');

const PedidoService = {

    async listarTodos() {
        return await Pedido.find().sort({ createdAt: -1 });
    },

    async criar(dados) {
        if (!dados.itens || dados.itens.length === 0) {
            throw new Error('O pedido deve ter pelo menos um item!');
        }

        if (!dados.total || dados.total <= 0) {
            throw new Error('Total do pedido inválido!');
        }

        const totalCalculado = dados.itens.reduce((acc, item) => {
            return acc + item.preco * item.quantidade;
        }, 0);

        const totalArredondado = Math.round(totalCalculado * 100) / 100;

        if (Math.abs(totalArredondado - dados.total) > 0.01) {
            throw new Error('Total do pedido não confere!');
        }

        const pedido = new Pedido(dados);
        return await pedido.save();
    },

    async atualizarStatus(id, status) {
        const statusValidos = ['pendente', 'confirmado', 'cancelado'];

        if (!statusValidos.includes(status)) {
            throw new Error('Status inválido!');
        }

        const pedido = await Pedido.findById(id);

        if (!pedido) {
            throw new Error('Pedido não encontrado!');
        }

        return await Pedido.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
    }
};

module.exports = PedidoService;