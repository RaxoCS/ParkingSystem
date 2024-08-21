const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Auto = require('./auto');

const Estadia = sequelize.define('Estadia', {
  id_estadia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  auto_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Auto,
      key: 'id_auto',
    },
  },
  entrada: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  salida: {
    type: DataTypes.DATE,
  },
  cobro: {
    type: DataTypes.FLOAT,
  },
}, {
  tableName: 'estadia',
  timestamps: false,
});

Estadia.belongsTo(Auto, { as: 'Auto', foreignKey: 'auto_id' });

module.exports = Estadia;
