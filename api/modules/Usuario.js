
const mongoose = require("mongoose");

const schema_usuario = new mongoose.Schema({
    foto: { type: String, required: true, unique: false },
    nombre: { type: String, required: true, unique: false },
    apellido: { type: String, required: true, unique: false },
    tipoIdentificacion: { type: String, required: true, unique: false},
    cedula: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true, unique: false },
    nombreDelTramo: { type: String, required: true, unique: false },
    cuentaIban: { type: String, required: true, unique: true },
    permisosMunicipales: { type: String, required: true, unique: false },
    contrasenna: { type: String, required: true, unique: false },
    estado: { type: String, default: "Inactivo" },
    // productos:[
    //     {
    //         nombre_prod:{type:String,required:false,unique:false},
    //         descripcion:{type:String,required:false,unique:false}
    //     }
    // ]
    
});

module.exports = mongoose.model("Usuario", schema_usuario, "usuario");

// cedula se agarra como string??
// tipo de identificación dos opciones. 