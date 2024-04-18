const mongoose = require("mongoose");

const schema_tramo = new mongoose.Schema({
    idUsuario: {type: String, required: true, unique: false},
    cuentaIBAN: {type: String, required: true, unique: false},
    nombreComercio: {type: String, required: true, unique: true}, 
    permisosMunicipales: {type: String, required: true, unique: false},
    ubicacion: {type: String, required: true, unique: false},
    estadoSolicitud: {type: String, required: true, unique: false},
    calificaciones: [
        {
            idComprador: {type: String, required: true, unique: false},
            calificacion: {type: String, required: true, unique: false},
        }
    ],
    inventario: [
        {
            idTramo: {type: String, required: true, unique: false},
            idProducto: {type: String, required: true, unique: false},
            cantidad: {type: String, required: true, unique: false},
            precioUnitario: {type: String, required: true, unique: false},
        }
    ],
});



module.exports = mongoose.model("Tramo", schema_tramo, "tramo");