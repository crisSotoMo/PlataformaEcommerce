const mongoose = require("mongoose");


const schema_producto = new mongoose.Schema({
    categoriaProducto: { type: String, required: true, unique: false},
    nombre: { type: String, required: true, unique: false },
    foto: { type: String, required: false, unique: false },
    descripcion: { type: String, required: true, unique: false }
});


// Consultarle a Arturo donde se va a agregar el impuesto. 


module.exports = mongoose.model("Producto", schema_producto, "producto");