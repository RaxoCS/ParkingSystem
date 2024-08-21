const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

// Función para generar el PDF
exports.generatePDF = (datosReporte, fecha_inicio, fecha_fin) => {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50
  });

  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  // Título del reporte
  doc.fontSize(16).text('Reporte de Estacionamiento', { align: 'center' });

  // Rango de fechas
  const formattedFechaInicio = new Date(fecha_inicio).toLocaleString('es-ES', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' });
  const formattedFechaFin = new Date(fecha_fin).toLocaleString('es-ES', { timeZone: 'UTC', dateStyle: 'short', timeStyle: 'short' });

  doc.fontSize(12).text(`Inicio: ${formattedFechaInicio} // Fin: ${formattedFechaFin}`, { align: 'center' });
  doc.moveDown();

  // Encabezados de tabla
  doc.fontSize(10)
     .text('Núm. Placa', 60, doc.y, { continued: true })
     .text('Tiempo Estacionado', 150, doc.y, { continued: true })
     .text('Tipo', 290, doc.y, { continued: true })
     .text('Cantidad a Pagar', 360, doc.y);
  
  // Línea divisoria
  doc.moveTo(50, doc.y + 5).lineTo(570, doc.y + 5).stroke();
  doc.moveDown();

  // Agregar los datos de cada fila
  datosReporte.forEach(row => {
    doc.fontSize(10)
       .text(row.placa, 60, doc.y, { continued: true })
       .text(row.tiempoEstacionado, 150, doc.y, { continued: true })
       .text(row.tipo, 290, doc.y, { continued: true })
       .text(row.cobro, 360, doc.y);
    doc.moveDown();
  });

  // Finalizar el PDF
  doc.end();

  return new Promise((resolve, reject) => {
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
  });
};

// Función para generar el Excel
exports.generateExcel = (datosReporte, fecha_inicio, fecha_fin) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reporte de Estacionamiento');

  // Títulos de columnas
  worksheet.columns = [
    { header: 'Núm. Placa', key: 'placa', width: 15 },
    { header: 'Tiempo Estacionado', key: 'tiempoEstacionado', width: 20 },
    { header: 'Tipo', key: 'tipo', width: 15 },
    { header: 'Cantidad a Pagar', key: 'cobro', width: 20 }
  ];

  // Agregar datos de cada fila
  datosReporte.forEach(row => {
    worksheet.addRow(row);
  });

  // Añadir un rango de fechas al principio del archivo
  worksheet.addRow([]);
  worksheet.addRow([`Inicio: ${fecha_inicio} // Fin: ${fecha_fin}`]);

  return workbook.xlsx.writeBuffer();
};
