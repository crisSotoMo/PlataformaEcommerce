const mongoose = require("mongoose");

const schema_solicitud = new mongoose.Schema({
    fecha: { type: Date, required: true },
    identificacion: { type: String, required: true }, // Cambiado de cedula a identificacion
    nombreVendedor: { type: String, required: true },
    tramo: { type: String, required: true },
    correo: { type: String, required: true },
    estado: { type: String, enum: ['Pendiente', 'Aprobado', 'Rechazado'], default: 'Pendiente' }
});

module.exports = mongoose.model("Solicitud", schema_solicitud, "solicitud");
