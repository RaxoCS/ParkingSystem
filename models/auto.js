const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Auto = sequelize.define('Auto', {
  id_auto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'auto',
  timestamps: false,
});



module.exports = Auto;
