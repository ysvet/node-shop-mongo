const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'mysqlmarzipa9', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;