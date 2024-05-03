const express = require("express");
const Vendedor = require("../models/usuarioVendedor");
const router = express.Router();
const nodemailer = require('nodemailer');

// REGISTRAR VENDEDOR
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

// REGISTRAR VENDEDOR
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



//http://localhost:3000/api/vendedor/usuarios_inactivos

//ELIMINAR VENDEDOR POR IDENTIFICACION
router.delete("/eliminar_vendedor/:identificacion", function (req, res) {
    let identificacion = req.params.identificacion;
    Vendedor.findOneAndDelete({ identificacion: identificacion })
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
//Pasar a admin****
router.put("/aprobar_registro/:identificacion", function (req, res) {
    let identificacion = req.params.identificacion;
    Vendedor.findOneAndUpdate({ identificacion: identificacion }, { estado: "Activo" }, { new: true })
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


module.exports = router