const Auto = require('../models/auto');
const Estadia = require('../models/estadia');

exports.registrarEntrada = async (req, res) => {
  const { placa, tipo } = req.body;

  try {
    // Verificar si el auto ya está registrado
    let auto = await Auto.findOne({ where: { placa } });

    if (!auto) {
      auto = await Auto.create({ placa, tipo });
    }

    // Crear nueva entrada
    await Estadia.create({
      auto_id: auto.id_auto,
      entrada: new Date(),
    });

    res.send(`<script>alert('Auto con placa ${placa} registrado exitosamente.'); window.location.href = '/';</script>`);
  } catch (error) {
    console.error('Error al registrar entrada:', error);
    res.send(`<script>alert('Error al registrar entrada.'); window.location.href = '/';</script>`);
  }
};
