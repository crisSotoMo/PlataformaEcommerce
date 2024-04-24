
const mongoose = require("mongoose");

const schema_usuario = new mongoose.Schema({
    rol: {type: String, required: true, unique: false}, // Se agrego rol como atributo de Usuario
    tipoIdentificacion: {type: String, required: true, unique: false},
    identificacion: {type: String, required: true, unique: true}, // Se cambio nombre de cedula por identificacion como atributo de Usuario
    nombre: {type: String, required: true, unique: false},
    apellido: {type: String, required: true, unique: false},
    telefono: {type: String, required: true, unique: false},
    correo: {type: String, required: true, unique: true},
    contrasenna: {type: String, required: true, unique: false},
    foto: {type: String, required: false, unique: false},
    estado: {type: String, default: "Inactivo"}
});

module.exports = mongoose.model("Usuario", schema_usuario, "usuario");

// cedula se agarra como string??
// tipo de identificación dos opciones.  