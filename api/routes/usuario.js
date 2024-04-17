const express = require("express");
const Usuario = require("../modules/Usuario");
const router = express.Router();

// POST
router.post("/registrar", function (req, res) {
    let body = req.body;
    let nuevo_usuario = new Usuario({
        rol: body.rol, // Se agrego rol como atributo de Usuario
        tipoIdentificacion: body.tipoIdentificacion,
        identificacion: body.identificacion, // Se cambio nombre de cedula por identificacion como atributo de Usuario
        nombre: body.nombre,
        apellido: body.apellido,
        telefono: body.telefono,
        correo: body.correo,
        contrasenna: body.contrasenna,
        foto: body.foto,
        nombreDelComercio: body.nombreDelComercio, // Se cambio nombre de nombreDelTramo por nombreDelComercio como atributo de Usuario
        cuentaIBAN: body.cuentaIBAN,
        permisosMunicipales: body.permisosMunicipales,
    });

    // error, usuarioDB
    nuevo_usuario.save()
        .then((usuarioDB) => {
            res.status(201).json({
                mensaje: "Usuario registrado",
                resultado: true,
                usuarioDB
            })
        }).catch((error) => {
            res.status(501).json({
                mensaje: "Error registrando usuario",
                resultado: false,
            })
        })
})

// GET GENERAL
router.get('/listar', function (req, res) {
    Usuario.find()
        .then((listaUsuarios) => {
            res.status(200).json({
                mensaje: "Listado de Usuarios",
                listaUsuarios
            })
        }).catch((error) => {
            res.json({
                resultado: false,
                error
            })
        })
})

// GET USUARIO POR IDENTIFICACION
router.get("/buscar-persona-identificacion", (req, res) => {
    Usuario.find({
            identificacion: req.query.identificacion
        })
        .then((buscarIdentificacion) => {
            res.status(200).json({
                mensaje: "Identificación Encontrada",
                buscarIdentificacion,
            })
        })
        .catch((error) => {
            res.json({
                resultado: false,
                error,
            })
        })
})

// Actualizar información de Usuario
router.put("/modificar", (req, res) => {
    const {
        _id,
        ...updateData
    } = req.body;

    Usuario.updateOne({
            _id
        }, {
            $set: updateData
        })
        .then((info) => {
            res.status(200).json({
                resultado: true,
                msj: "Actualización exitosa",
                info
            })
        })
        .catch((error) => {
            res.status(500).json({
                resultado: false,
                msj: "No se pudo actualizar la persona",
                error
            })
        })
})

// ELiminar Usuario
router.delete("/eliminar", async (req, res) => {
    try {
        const {
            _id
        } = req.body;

        const info = await Usuario.deleteOne({
            _id
        });

        if (info.deletedCount === 0) {
            res.status(404).json({
                resultado: false,
                msj: "No se encontró ningun usuario para eliminar"
            });
        } else {
            res.status(200).json({
                resultado: true,
                msj: "Se eliminó el usuario de forma exitosa",
                info
            });
        }
    } catch (error) {
        res.status(500).json({
            resultado: false,
            msj: "No se pudo eliminar el usuario",
            error: error.message
        });
    }
});

module.exports = router