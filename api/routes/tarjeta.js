const express = require("express");
const Usuario = require("../models/tarjeta");
const router = express.Router();

// POST
router.post("/registrar", function (req, res) {
    let body = req.body;
    let nueva_tarjeta = new Tarjeta({
        idUsuario: body.idUsuario, 
        idMetodo: body.idMetodo,
        numeroTarjeta: body.numeroTarjeta,
        tarjetaCvv: body.tarjetaCvv,
        fechaVencimiento: body.fechaVencimiento,
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