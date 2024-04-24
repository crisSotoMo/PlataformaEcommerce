const mongoose = require("mongoose");

const schema_compra = new mongoose.Schema({
    idPersona: {type: String, required: true, unique: false},
    fechaCompra: {type: String, required: true, unique: false},
    montoTotal: {type: String, required: true, unique: false},
    estadoCompra: {type: String, required: true, unique: false},
    productos: [
        {
            idVendedor: {type: String, required: true, unique: false},
            idProducto: {type: String, required: true, unique: false},
            cantidad: {type: Number, required: false, unique: false}
        }
    ]
});

module.exports = mongoose.model("Compra", schema_compra, "compra");