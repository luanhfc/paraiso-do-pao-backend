const Produto = require('../models/produto');

const ProdutoService = {

    async listarTodos(usuario) {
        const filtro = { disponivel: true };

        if (!usuario || usuario.idade < 18) {
            filtro.restrito = false;
        }

        return await Produto.find(filtro);
    },

    async listarPorCategoria(categoria, usuario) {
        const categoriasValidas = ['paes', 'bolos', 'salgados'];

        if (!categoriasValidas.includes(categoria)) {
            throw new Error('Categoria inválida!');
        }

        const filtro = { categoria, disponivel: true };

        if (!usuario || usuario.idade < 18) {
            filtro.restrito = false;
        }

        return await Produto.find(filtro);
    },

    async cadastrar(dados) {
        if (!dados.nome || dados.nome.trim() === '') {
            throw new Error('Nome do produto é obrigatório!');
        }

        if (!dados.preco || dados.preco <= 0) {
            throw new Error('Preço deve ser maior que zero!');
        }

        if (!dados.categoria) {
            throw new Error('Categoria é obrigatória!');
        }

        const produto = new Produto(dados);
        return await produto.save();
    },

    async remover(id) {
        const produto = await Produto.findById(id);

        if (!produto) {
            throw new Error('Produto não encontrado!');
        }

        await Produto.findByIdAndDelete(id);
        return { mensagem: 'Produto removido com sucesso!' };
    }
};

module.exports = ProdutoService;