const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const override = require('method-override');
const session = require('express-session');

//Configuraciones
const port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(override('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//Rutas


app.get('/', (req, res)=>{
    res.send('Hola remardito')
})


app.listen(port, ()=> console.log('Aplicación escuchando en el puerto ' + port))