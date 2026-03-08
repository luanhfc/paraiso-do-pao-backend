const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    itens: [
        {
            produtoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produto',
                required: true
            },
            nome: String,
            preco: Number,
            quantidade: Number
        }
    ],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pendente', 'confirmado', 'cancelado'],
        default: 'pendente'
    }
}, { timestamps: true });

module.exports = mongoose.model('Pedido', pedidoSchema);