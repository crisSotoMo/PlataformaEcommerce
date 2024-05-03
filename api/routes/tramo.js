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
        fechaNacimiento: body.fechaNacimiento,
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


router.post("/registrar_vendedor", function (req, res) {
    let body = req.body;
    let nuevo_vendedor = new Vendedor({
        nombreDelComercio: body.nombreComercio,
        cuentaIban: body.cuentaIBAN,
        fechaNacimiento: body.fechaNacimiento,
        permisosMunicipales: body.permisosMunicipales,
        rol: body.rol,
        tipoIdentificacion: body.tipoIdentificacion,
        identificacion: body.identificacion,
        nombre: body.nombre,
        apellido: body.apellido,
        telefono: body.telefono,
        correo: body.correo,
        contrasena: body.contrasena,
    });

    // error, vendedorDB
    nuevo_vendedor.save()
        .then((vendedorDB) => {
            res.status(201).json({
                mensaje: "Vendedor registrado",
                resultado: true,
                vendedorDB
            })
        }).catch((error) => {
            res.status(501).json({
                mensaje: "Error registrando vendedor",
                resultado: false,
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

// Obtener usuarios inactivos
router.get("/usuarios_inactivos", function (req, res) {
    Vendedor.find({ estado: "Inactivo" })
        .then((vendedores) => {
            res.status(200).json({
                mensaje: "Vendedores inactivos",
                resultado: true,
                vendedores
            })
        }).catch((error) => {
            res.status(501).json({
                mensaje: "Error obteniendo vendedores",
                resultado: false,
            })
        })
})

// Eliminar Vendedor
router.delete("/eliminar_vendedor/:identificacion", function (req, res) {
    let identificacion = req.params.identificacion;
    Tramo.findOneAndDelete({ identificacion: identificacion })
        .then((vendedorDB) => {
            if (!vendedorDB) {
                return res.status(404).json({
                    mensaje: "Vendedor no encontrado",
                    resultado: false
                })
            }
            res.status(200).json({
                mensaje: "Vendedor eliminado",
                resultado: true,
                vendedorDB
            })
        }).catch((error) => {
            res.status(501).json({
                mensaje: "Error eliminando vendedor",
                resultado: false,
            })
        })
})

//APROBAR REGISTRO Y ENVIAR CORREO
router.put("/aprobar_registro/:identificacion", function (req, res) {
    let identificacion = req.params.identificacion;
    Tramo.findOneAndUpdate({ identificacion: identificacion }, { estado: "Activo" }, { new: true })
        .then((vendedorDB) => {
            if (!vendedorDB) {
                return res.status(404).json({
                    mensaje: "Vendedor no encontrado",
                    resultado: false,
                })
            }
            //Enviar correo
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'logiclab24@gmail.com',
                    pass: 'logiclab24'
                }
            });
            let mailOptions = {
                from: 'Servidor Node.js',
                to: vendedorDB.correo,
                subject: 'Registro Aprobado',
                text: `Su registro ha sido aprobado, su contrasena es: ${vendedorDB.contrasena}`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).json({
                mensaje: "Registro aprobado",
                resultado: true,
                vendedorDB
            })
        }
        ).catch((error) => {
            res.status(501).json({
                mensaje: "Error aprobando registro",
                resultado: false,
            })
        })
});

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