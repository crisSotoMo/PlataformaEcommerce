const express = require("express");
const Compra = require("../models/compra");
const router = express.Router();

// POST
router.post("/registrar", function (req, res) {
    let body = req.body;
    let nueva_compra = new Compra({
        idPersona : body.idPersona,
        fechaCompra: body.fechaCompra,
        montoTotal: body.montoTotal,
        estadoCompra: body.estadoCompra,
        productos: body.productos
    });

    // error, tarjetaDB
    nueva_compra.save()
        .then((compraDB) => {
            res.status(201).json({
                mensaje: "Compra registrada",
                resultado: true,
                compraDB
            })
        }).catch((error) => {
            res.status(501).json({
                mensaje: "Error registrando compra",
                resultado: false,
            })
        })
})

// Obtener todas las compras
router.get('/listar', function (req, res) {
    Compra.find()
        .then((listaCompras) => {
            res.status(200).json({
                mensaje: "Listado de compras",
                resultado: listaCompras
            })
        }).catch((error) => {
            res.status(500).json({
                resultado: false,
                error
            })
        })
})

// Obtener ordenes de compra por Usuario
// GET ORDENES BY ID USUARIO
router.get("/obtenerComprasUsuario/:idPersona", (req, res) => {
    Compra.find({
            idPersona: req.params.idPersona
        })
        .then((buscarCompras) => {
            res.status(200).json({
                mensaje: "Compras Encontradas",
                resultado: buscarCompras 
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