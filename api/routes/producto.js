const express = require("express");
//necesitamos requerir el modelo de personas
const Producto = require("../models/producto");
const router = express.Router();



//http://localhost:8000/producto/registrar
//POST --> crear nuevos registros de productos 
router.post("/registrar", function (req, res) {
    let body = req.body;
    let nuevo_producto = new Producto({
        categoriaProducto: body.categoriaProducto,
        nombre: body.nombre,
        foto: body.foto,
        descripcion: body.descripcion,
    });

    // error, productoDB
    nuevo_producto.save()
        .then((productoDB) => {
            res.status(201).json({
                mensaje: "Producto registrado",
                resultado: true,
                productoDB
            })
        }).catch((error) => {
            res.status(501).json({
                mensaje: "Error registrando el producto",
                resultado: false,
            })
        })
})

// GET

router.get('/listar', function (req, res) {
    Producto.find()
        .then((listaProductos) => {
            res.status(200).json({
                mensaje: "Listado de Productos",
                resultado: listaProductos
            })
        }).catch((error) => {
            res.json({
                resultado: false,
                error
            })
        })
})

// PUT
router.put("/modificar", (req, res) => {
    const {
        _id,
        ...updateData
    } = req.body;

    Producto.updateOne({
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
                msj: "No se pudo actualizar el producto",
                error
            })
        })
})

// ELiminar Producto
router.delete("/eliminar", async (req, res) => {
    try {
        const {
            _id
        } = req.body;

        const info = await Producto.deleteOne({
            _id
        });

        if (info.deletedCount === 0) {
            res.status(404).json({
                resultado: false,
                msj: "No se encontró ningun producto para eliminar"
            });
        } else {
            res.status(200).json({
                resultado: true,
                msj: "Se eliminó el producto de forma exitosa",
                info
            });
        }
    } catch (error) {
        res.status(500).json({
            resultado: false,
            msj: "No se pudo eliminar el producto",
            error: error.message
        });
    }
});


module.exports = router;