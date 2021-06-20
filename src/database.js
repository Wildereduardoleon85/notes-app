const mongoose = require('mongoose');
require('dotenv').config();


const dbupdate = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}
mongoose.connect(process.env.HOST, dbupdate);

mongoose.connection.on('error', () => console.log('Error en la conexión de la Base de Datos'));
mongoose.connection.on('connected', ()=> console.log('Base de datos conectada'))

