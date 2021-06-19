const mongoose = require('mongoose');

const host = 'mongodb+srv://Wilder:Wleon2212*@cluster0.lgemx.mongodb.net/notes-app?retryWrites=true&w=majority'

const dbupdate = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}
mongoose.connect(host, dbupdate);

mongoose.connection.on('error', () => console.log('Error en la conexión de la Base de Datos'));
mongoose.connection.on('connected', ()=> console.log('Base de datos conectada'))

