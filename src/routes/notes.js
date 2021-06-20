const express = require('express');
const router = express.Router();
const Note = require('../models/Note')


router.get('/notes/add', (req, res)=>{
    res.render('./notes/new-note')
});

router.post('/notes/new-note', async (req, res)=>{
    const {titulo, descripcion} = req.body;
    const errores = [];
    if(titulo.trim() === ''){
        errores.push({text: 'Por favor escribe un Título'})
    }if(descripcion.trim() === ''){
        errores.push({text: 'Por favor escribe una descripción'})
    }if(errores.length > 0){
        res.render('./notes/new-note', {
            errores,
            titulo,
            descripcion
        })
    }else{
        const newNote = new Note({titulo, descripcion});
        await newNote.save();
        res.redirect('/notes')
    }
});


router.get('/notes', (req, res)=>{
    res.send('notas desde la base de datos')
});



module.exports = router;