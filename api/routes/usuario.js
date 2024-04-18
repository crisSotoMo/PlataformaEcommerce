const express = require("express");
const Usuario = require("../models/usuario");
const router = express.Router();

// POST
router.post("/ingresar",function (req, res){
    // logica = si la informacion ingresada por un usuario, tiene la misma contrasenna y el mismo email en una lista, debe de aceptar la info, de lo contrario debe mostrar que los datos están incorrectos. 
    let correo = req.body.correo;
    let contrasenna = req.body.contrasenna;
    Usuario.find({
        correo
    })
    .then((buscarUsuario) => {
        if(buscarUsuario[0].contrasenna == contrasenna){
            res.status(200).json({
                mensaje: "Inicio de sesión exitoso!",
                resultado: buscarUsuario
            })
        }
        else{
            res.status(200).json({
                mensaje: "Correo o contraseña invalido",
                resultado: false
            })
        }
    })
    .catch((error) => {
        res.json({
            resultado: false,
            error,
        })
    })
}
)

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
                resultado: listaUsuarios
            })
        }).catch((error) => {
            res.json({
                resultado: false,
                error
            })
        })
})

// GET USUARIO POR IDENTIFICACION
router.get("/buscar-persona-identificacion/:id", (req, res) => {
    Usuario.find({
            identificacion: req.params.id
        })
        .then((buscarIdentificacion) => {
            res.status(200).json({
                mensaje: "Identificación Encontrada",
                resultado: buscarIdentificacion 
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