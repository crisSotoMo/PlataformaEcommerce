const express = require('express');
const router = express.Router();
const modeloUsuario = require('../models/usuario');
const { post } = require('./usuario');

router.post('/ingresar', async function (req, res) {
    const { identificacion, contrasena } = req.body;
    if (!identificacion || !contrasena) {
        console.error('No se envió identificación o contraseña');
        res.status(400).send('No se envió identificación o contraseña');
        return;
    }
    try {
        const usuario = await modeloUsuario.findOne({ identificacion, contrasena });
        if (usuario) {
            res.send({
                _id: usuario._id,
                rol: usuario.rol,
            });
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).send('Error al buscar usuario');
    }
})

module.exports = router;


