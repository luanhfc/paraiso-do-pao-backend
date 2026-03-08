const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true,
        enum: ['paes', 'bolos', 'salgados']
    },
    descricao: {
        type: String,
        default: ''
    },
    imagem: {
        type: String,
        default: ''
    },
    disponivel: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Produto', produtoSchema);