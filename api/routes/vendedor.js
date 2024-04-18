const express = require("express");
const Tramo = require("../models/tramo");
const router = express.Router();

//POST TRAMO
router.post("/registrar", function (req, res) {
    let body = req.body;
    let nuevo_tramo = new Tramo({
        idUsuario: body.idUsuario,
        cuentaIBAN: body.cuentaIBAN,
        nombreComercio: body.nombreComercio,
        permisosMunicipales: body.permisosMunicipales,
        ubicacion: body.ubicacion,
        estadoSolicitud: body.estadoSolicitud
    });

    // error, tramoDB
    nuevo_tramo.save()
        .then((tramoDB) => {
            res.status(201).json({
                mensaje: "Tramo registrado",
                resultado: true,
                tramoDB
            })
        }).catch((error) => {
            res.status(501).json({
                mensaje: "Error registrando tramo",
                resultado: false,
            })
        })
})

module.exports = router