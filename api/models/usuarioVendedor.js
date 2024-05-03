const mongoose = require("mongoose");
const Usuario = require('./usuario');

const schema_vendedor = new mongoose.Schema({
    nombreDelComercio: {type: String, required: false, unique: false},
    cuentaIban: {type: String, required: false, unique: false},
    fechaNacimiento: {type: Date, required: false, unique: false},
    permisosMunicipales: {type: String, required: false, unique: false},
});

const Vendedor = Usuario.discriminator('Vendedor', schema_vendedor);

module.exports = Vendedor;