const express = require("express");
const Tramo = require("../models/tramo");
const router = express.Router();

// Crear un nuevo tramo
router.post("/registrar", function (req, res) {
    let body = req.body;
    let nuevo_tramo = new Tramo({
        cuentaIBAN: body.cuentaIBAN,
        nombreComercio: body.nombreComercio,
        permisosMunicipales: body.permisosMunicipales,
        ubicacion: body.ubicacion,
        estadoSolicitud: body.estadoSolicitud,
        calificaciones: body.calificaciones,
        inventario: body.inventario
    });

    nuevo_tramo.save()
        .then((tramoDB) => {
            res.status(201).json({
                mensaje: "Tramo registrado",
                resultado: true,
                tramoDB
            })
        }).catch((error) => {
            res.status(501).json({
                mensaje: "Error registrando el tramo",
                resultado: false,
                error
            })
        })
})

// Obtener todos los tramos
router.get('/listar', function (req, res) {
    Tramo.find()
        .then((listaTramos) => {
            res.status(200).json({
                mensaje: "Listado de Tramos",
                resultado: listaTramos
            })
        }).catch((error) => {
            res.status(500).json({
                resultado: false,
                error
            })
        })
})

// Actualizar un tramo
router.put("/modificar", (req, res) => {
    const { _id, ...updateData } = req.body;

    Tramo.updateOne({ _id }, { $set: updateData })
        .then((info) => {
            res.status(200).json({
                resultado: true,
                mensaje: "Actualización exitosa",
                info
            })
        })
        .catch((error) => {
            res.status(500).json({
                resultado: false,
                mensaje: "No se pudo actualizar el tramo",
                error
            })
        })
})

// Eliminar un tramo
router.delete("/eliminar", async (req, res) => {
    try {
        const { _id } = req.body;
        const info = await Tramo.deleteOne({ _id });

        if (info.deletedCount === 0) {
            res.status(404).json({
                resultado: false,
                mensaje: "No se encontró ningún tramo para eliminar"
            });
        } else {
            res.status(200).json({
                resultado: true,
                mensaje: "Se eliminó el tramo de forma exitosa",
                info
            });
        }
    } catch (error) {
        res.status(500).json({
            resultado: false,
            mensaje: "No se pudo eliminar el tramo",
            error: error.message
        });
    }
});

module.exports = router;