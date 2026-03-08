const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const produtosRoutes = require('./routes/produtos');
const pedidosRoutes = require('./routes/pedidos');

const app = express();

// Middlewares
app.use(cors({
    origin: '*' // permite qualquer origem durante desenvolvimento
}));
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB conectado com sucesso!'))
    .catch(err => console.log('❌ Erro ao conectar:', err));

// Rotas
app.use('/api/produtos', produtosRoutes);
app.use('/api/pedidos', pedidosRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.json({ mensagem: 'API Paraíso do Pão funcionando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});