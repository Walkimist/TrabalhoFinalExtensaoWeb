const Sequelize = require('sequelize');
const database = require('../db');

const Produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    indicador_ativo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

module.exports = Produto;