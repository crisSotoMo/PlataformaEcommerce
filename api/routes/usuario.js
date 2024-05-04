const express = require("express");
const Usuario = require("../models/usuario");
const usuario_vendedor = require("../models/usuarioVendedor");
const router = express.Router();

// POST
router.post("/ingresar", function (req, res) {
    // logica = si la informacion ingresada por un usuario, tiene la misma contrasena y el mismo email en una lista, debe de aceptar la info, de lo contrario debe mostrar que los datos están incorrectos.
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;
    Usuario.find({
        correo
    })
        .then((buscarUsuario) => {
            if (buscarUsuario[0].contrasena == contrasena) {
                res.status(200).json({
                    mensaje: "Inicio de sesión exitoso!",
                    resultado: buscarUsuario
                })
            }
            else {
                res.status(200).json({
                    mensaje: "Correo o contraseña invalido",
                    resultado: false
                })
            }
        })
        .catch((error) => {
            res.json({
                mensaje: "Error de logueo",
                resultado: false,
                error,
            })
        })
}
)
router.post('/register', async (req, res)=> {
    try{
        const newUser = new Usuario(req.body);
        console.log(newUser);
        await newUser.save();
        res.status(201).json(newUser);
    } catch(error){
        console.error(error);
        res.status(500).json({message: 'Hubo un error al crear el usuario'})
    }
});

router.post('/register_seller', async (req, res)=> {
    try{
        const newUser = new usuario_vendedor(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch(error){
        console.error(error);
        res.status(500).json({message: 'Hubo un error al crear el suaurio'})
    }
});

// GET LISTAR USUARIOS
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

// GET USUARIO POR CEDULA
router.get("/buscar-usuario-identificacion", (req, res) => {
    Usuario.find({ identificacion: req.query.identificacion }).exec()
        .then(usuarioBuscado => {
            if (usuarioBuscado.length === 0) {
                res.json({
                    msj: "El usuario no existe",
                });
            } else {
                res.status(200).json({
                    resultado: true,
                    usuarioBuscado
                });
            }
        })
        .catch(error => {
            res.status(501).json({
                msj: "Ocurrió el siguiente error",
                error
            });
        });
});

// GET USUARIO POR ID
router.get('/usuario/:userId/productos/:productId', function (req, res) {
    const usuarioId = req.params.userId;
    const productoId = req.params.productId;

    Usuario.findById(usuarioId)
        .then((usuario) => {
            if (!usuario) {
                res.status(404).json({
                    mensaje: "El usuario no fue encontrado"
                });
            } else {
                const producto = usuario.productos.find(producto => producto._id.toString() === productoId);
                if (!producto) {
                    res.status(404).json({
                        mensaje: "El producto no fue encontrado para este usuario"
                    });
                } else {
                    res.status(200).json({
                        mensaje: "Producto encontrado",
                        producto: producto
                    });
                }
            }
        }).catch((error) => {
            res.status(500).json({
                mensaje: "Ocurrió un error al buscar el producto",
                error: error
            });
        });
});


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

//DELETE http://localhost:3000/api/usuario/eliminar/123456

router.delete("/eliminar/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const info = await Usuario.deleteOne({
            _id: id
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


//AGREGAR PRODUCTOS

//localhost:3000/api/usuario/agregar_productos
router.post("/agregar_productos", (req, res) => {
    if (req.body._id) {
        Usuario.updateOne({ _id: req.body._id }, {
            $push: {
                'productos': {
                    nombre_prod: req.body.name,
                    descripcion: req.body.descripcion
                }
            }
        }).then(()=>{
            res.status(201).json({
                resultado: true,
                msj: "Producto agregado",
            });
        }).catch((error) => {
            res.status(501).json({
                resultado: false,
                msj: "No se pudo agregar el producto debido al error:",
                error: error
            });
        })
    } else {
        res.status(501).json({
            resultado: false,
            msj: "No se proporcionó un ID",
        });
    }
})