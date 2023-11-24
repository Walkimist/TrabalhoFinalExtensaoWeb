const Sequelize = require('sequelize');
const database = require('../db');

const Transacao = database.define('transacao', {
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
    id_produto: {
        type: Sequelize.INTEGER,
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
    total: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    indicador_ativo: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Transacao;