const mongoose = require("mongoose");

const schema_tramo = new mongoose.Schema({
    cuentaIBAN: {type: String, required: true, unique: false},
    nombreComercio: {type: String, required: true, unique: true}, 
    permisosMunicipales: {type: String, required: true, unique: false},
    ubicacion: {type: String, required: true, unique: false},
    estadoSolicitud: {type: String, required: true, unique: false},
    calificaciones: [
        {
            calificacion: {type: Number, required: false, unique: false},
        }
    ],
    inventario:[
        {
            cantidad: { type: Number, required: true, unique: false},
            precioUnitario:{ type: Number, required: true, unique: false},
            impuesto: { type: Number, required: true, unique: false }
        }
    ]
});


module.exports = mongoose.model("Tramo", schema_tramo, "tramo");