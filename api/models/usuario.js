const mongoose = require("mongoose");

const options = { discriminatorKey: 'tipoUsuario' };

const schema_usuario = new mongoose.Schema({
    rol: {type: String, required: true, unique: false},
    foto: {type: String, required: false, unique: false},
    nombre: {type: String, required: true, unique: false},
    apellido: {type: String, required: true, unique: false},
    tipoIdentificacion: {type: String, required: true, unique: false},
    identificacion: {type: String, required: true, unique: true},
    correo: {type: String, required: true, unique: true},
    telefono: {type: String, required: true, unique: false},
    contrasena: {type: String, required: true, unique: false},
    estado: {type: String, default: "Inactivo"},
}, options);

const Usuario = mongoose.model("Usuario", schema_usuario, "usuario");

module.exports = Usuario;