const express = require("express");
const Tarjeta = require("../models/tarjeta");
const router = express.Router();

// POST
router.post("/registrar", function (req, res) {
    let body = req.body;
    let nueva_tarjeta = new Tarjeta({ 
        idPersona: body.idPersona,
        numeroTarjeta: body.numeroTarjeta,
        tarjetaCvv: body.tarjetaCvv,
        fechaVencimiento: body.fechaVencimiento
    });

    // error, tarjetaDB
    nueva_tarjeta.save()
        .then((tarjetaDB) => {
            res.status(201).json({
                mensaje: "Tarjeta registrada",
                resultado: true,
                tarjetaDB
            })
        }).catch((error) => {
            res.status(501).json({
                mensaje: "Error registrando tarjeta",
                resultado: false,
            })
        })
})

// Actualizar información de Tarjeta
router.put("/modificar", (req, res) => {
    const {
        _id,
        ...updateData
    } = req.body;

    Tarjeta.updateOne({
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
                msj: "No se pudo actualizar la tarjeta",
                error
            })
        })
})

// Eliminar Tarjeta
router.delete("/eliminar", async (req, res) => {
    try {
        const {
            _id
        } = req.body;

        const info = await Tarjeta.deleteOne({
            _id
        });

        if (info.deletedCount === 0) {
            res.status(404).json({
                resultado: false,
                msj: "No se encontró ninguna tarjeta para eliminar"
            });
        } else {
            res.status(200).json({
                resultado: true,
                msj: "Se eliminó la tarjeta de forma exitosa",
                info
            });
        }
    } catch (error) {
        res.status(500).json({
            resultado: false,
            msj: "No se pudo eliminar la tarjeta",
            error: error.message
        });
    }
});

// GET TARJETAS BY ID USUARIO
router.get("/obtenerTarjetasUsuario/:idPersona", (req, res) => {
    Tarjeta.find({
            idPersona: req.params.idPersona
        })
        .then((buscarTarjetas) => {
            res.status(200).json({
                mensaje: "Tarjetas Encontradas",
                resultado: buscarTarjetas 
            })
        })
        .catch((error) => {
            res.json({
                resultado: false,
                error,
            })
        })
})

module.exports = router;