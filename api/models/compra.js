const mongoose = require("mongoose");

const schema_compra = new mongoose.Schema({
    fechaCompra: {type: String, required: true, unique: false},
    montoTotal: {type: String, required: true, unique: false},
    estadoCompra: {type: String, required: true, unique: false},
});

module.exports = mongoose.model("Compra", schema_compra, "compra");