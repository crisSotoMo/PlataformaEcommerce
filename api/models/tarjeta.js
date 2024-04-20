const mongoose = require("mongoose");

const schema_tarjeta = new mongoose.Schema({
    idUsuario: {type: String, required: true, unique: false},
    idMetodo: {type: String, required: true, unique: false},
    numeroTarjeta: {type: String, required: true, unique: true},
    tarjetaCvv: {type: String, required: true, unique: false},
    fechaVencimiento: {type: String, required: true, unique: false},
});

module.exports = mongoose.model("Tarjeta", schema_tarjeta, "tarjeta");