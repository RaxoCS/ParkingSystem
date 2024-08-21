const { Sequelize } = require('sequelize');

// Configuracion de la conexión a MySQL
const sequelize = new Sequelize('estacionamiento', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = { sequelize };
