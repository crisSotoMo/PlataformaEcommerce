const express = require("express");
const Usuario = require("../modules/Usuario");
const router = express.Router();

// POST

router.post("/registrar", function (req, res) {
    let body = req.body;
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

// GET CEDULA

router.get("/buscar-persona-cedula", (req, res) => {
    let identificacion = req.query.cedula

    Usuario.find({ cedula: identificacion })
        .then((buscarCedula) => {
            res.status(200).json({
                mensaje: "Cedula Encontrada",
                buscarCedula,
            })
        })
        .catch((error) => {
            res.json({
                resultado: false,
                error,
            })
        })
})

router.put("/modificar", (req, res) => {
    const { _id, ...updateData } = req.body;

    Usuario.updateOne({ _id }, { $set: updateData })
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

router.delete("/eliminar", async (req, res) => {
    try {
        const { _id } = req.body;

        const info = await Usuario.deleteOne({ _id });

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