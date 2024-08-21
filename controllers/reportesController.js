const { Op } = require('sequelize');
const Auto = require('../models/auto');
const Estadia = require('../models/estadia');
const { generatePDF, generateExcel } = require('../utils/reportGenerator');

exports.generarReporte = async (req, res) => {
  const { fecha_inicio, fecha_fin, formato } = req.query;

  try {
    // Obtener los registros de estadías dentro del rango de fechas
    const estadias = await Estadia.findAll({
      where: {
        entrada: {
          [Op.between]: [new Date(fecha_inicio), new Date(fecha_fin)]
        },
        salida: { [Op.ne]: null } 
      },
      include: [{ model: Auto, as: 'Auto' }]
    });

    // Formatear los datos
    const datosReporte = estadias.map(estadia => {
      const auto = estadia.Auto;

      // Verificamos si el auto está definido
      if (!auto) {
        return null; // Si no se encuentra el auto, saltamos este registro
      }

      const tiempoEstacionado = (new Date(estadia.salida) - new Date(estadia.entrada)) / (1000 * 60); // en minutos
      let tiempoFormateado = `${Math.floor(tiempoEstacionado)} min.`;

      if (tiempoEstacionado >= 60) {
        const horas = Math.floor(tiempoEstacionado / 60);
        const minutos = Math.floor(tiempoEstacionado % 60);
        tiempoFormateado = minutos > 0 ? `${horas} hrs ${minutos} min.` : `${horas} hrs`;
      }

      return {
        placa: auto.placa,
        tiempoEstacionado: tiempoFormateado,
        tipo: auto.tipo,
        cobro: auto.tipo === 'oficial' ? '-' : `$${estadia.cobro.toFixed(2)}`
      };
    }).filter(Boolean); // Filtrar valores nulos o indefinidos

    // Generar el archivo según el formato seleccionado
    if (formato === 'pdf') {
      const pdfBuffer = await generatePDF(datosReporte, fecha_inicio, fecha_fin);
      res.contentType('application/pdf');
      res.send(pdfBuffer);
    } else if (formato === 'excel') {
      const excelBuffer = await generateExcel(datosReporte, fecha_inicio, fecha_fin);
      res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(excelBuffer);
    } else {
      res.status(400).send('Formato no soportado');
    }
  } catch (error) {
    res.status(500).send('Error al generar el reporte');
  }
};
