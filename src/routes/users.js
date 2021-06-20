const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res)=>{
    res.render('./users/signin')
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res)=>{
    res.render('./users/signup')
});

router.post('/users/signup', async (req, res)=>{
    const {nombre, correo, contraseña, confirmarContraseña} = req.body;
    const errores = [];
    if(contraseña != confirmarContraseña){
        errores.push({text: 'La contraseña no coincide'})
    }if(contraseña.length < 5){
        errores.push({text: 'La contraseña debe ser superior a 4 digitos'})
    }if(nombre.trim() === ''){
        errores.push({text: 'El campo "Nombre" no puede estar vacío'})
    }if(correo.trim() === ''){
        errores.push({text: 'El campo "Correo" no puede estar vacío'})
    }if(errores.length > 0){
        res.render('./users/signup', {
            errores,
            nombre,
            correo,
            contraseña,
            confirmarContraseña
        })
    }else{
        const emailUser = await User.findOne({correo : correo});
        if(emailUser){
            req.flash('error_msg', 'El correo ingresado ya está en uso');
            redirect('/users/signup');
        }
        const newUser = new User({nombre, correo, contraseña});
        newUser.contraseña = await newUser.encryptPassword(contraseña)
        await newUser.save();
        req.flash('success_msg', 'Usuario Registrado!!');
        res.redirect('/users/signin');
    }
});

module.exports = router;