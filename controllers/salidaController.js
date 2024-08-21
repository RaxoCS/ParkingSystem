const Auto = require('../models/auto');
const Estadia = require('../models/estadia');

exports.registrarSalida = async (req, res) => {
  const { placa } = req.body;

  try {
    // Buscar el auto
    const auto = await Auto.findOne({ where: { placa } });

    if (!auto) {
      console.log('Auto no encontrado');
      return res.send(`<script>alert('Auto no encontrado.'); window.location.href = '/';</script>`);
    }

    // Buscar la estancia actual del auto
    const estadia = await Estadia.findOne({
      where: { auto_id: auto.id_auto, salida: null },
    });

    if (!estadia) {
      console.log('Estancia no encontrada');
      return res.send(`<script>alert('Estancia no encontrada.'); window.location.href = '/';</script>`);
    }

    // Registrar la salida y calcular el cobro
    const salida = new Date();
    const tiempoEstacionado = (salida - new Date(estadia.entrada)) / (1000 * 60); // minutos

    let cobro = 0;
    if (auto.tipo === 'residente') {
      cobro = tiempoEstacionado;
    } else if (auto.tipo === 'no residente') {
      cobro = tiempoEstacionado * 3;
    }

    await estadia.update({ salida, cobro });

    res.send(`<script>alert('Auto con placa ${placa} ha salido. Total a pagar: $${cobro.toFixed(2)}'); window.location.href = '/';</script>`);
  } catch (error) {
    console.error('Error al registrar salida:', error);
    res.send(`<script>alert('Error al registrar salida.'); window.location.href = '/';</script>`);
  }
};
