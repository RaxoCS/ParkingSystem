const express = require('express');
const path = require('path');
const app = express();
const entradaRoutes = require('./routes/entrada');
const salidaRoutes = require('./routes/salida');
const reportesRoutes = require('./routes/reportes');
const { sequelize } = require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/entrada', entradaRoutes);
app.use('/salida', salidaRoutes);
app.use('/reportes', reportesRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

sequelize.sync({ alter: true }).then(() => {
  console.log('Tablas sincronizadas');
});
