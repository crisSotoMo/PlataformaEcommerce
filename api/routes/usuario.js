const express = require("express");
const Usuario = require("../modules/Usuario");
const router = express.Router();

router.post("/registrar", function (req, res) {
    // let body = req.body;
    let nuevo_usuario = new Usuario({
        foto: body.foto,
        nombre: body.nombre,
        apellido: body.apellido,
        tipoIdentificacion: body.tipoIdentificacion,
        cedula: body.cedula,
        correo: body.correo,
        telefono: body.telefono,
        nombreDelTramo: body.nombreDelTramo,
        cuentaIban: body.cuentaIban,
        permisosMunicipales: body.permisosMunicipales,
        contrasenna: body.contrasenna,
    });

    // error, usuarioDB
    nuevo_usuario.save()
    .then((usuarioDB)=> {
        res.status(201).json({
            mensaje: "Usuario registrado",
            resultado: true,
            usuarioDB
        })
    }).catch((error)=>{
        res.status(501).json({
            mensaje: "Error registrando usuario",
            resultado: false,
        })
    })
});

module.exports= router;