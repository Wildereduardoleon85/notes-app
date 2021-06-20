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
        req.flash('success_msg', 'Nota Agregada!!')
        res.redirect('/notes')
    }
});

router.get('/notes', async (req, res)=>{
    const notes = await Note.find().sort({fecha: 'desc'});
    res.render('./notes/all-notes', {notes});
});

router.get('/notes/edit/:id', async(req, res)=>{
    const note = await Note.findById(req.params.id)
    res.render('./notes/edit-note', {note})
});

router.put('/notes/edit-note/:id', async(req, res)=>{
    const {titulo, descripcion} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {titulo, descripcion});
    req.flash('success_msg', 'Nota Actualizada!!')
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async(req, res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota Borrada!!')
    res.redirect('/notes');
})

module.exports = router;