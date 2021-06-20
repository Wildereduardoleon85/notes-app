const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'correo'
}, async (correo, contraseña, hecho)=>{
    const user = await User.findOne({correo: correo});
    if(!user){
        return hecho(null, false, {message: 'Usuario no encontrado'});
    }else{
        const match = await user.matchPassword(contraseña);
        if(match){
            return hecho(null, user);
        }else{
            return hecho(null, false, {message: 'La contraseña es incorrecta'})
        }
    }
})); 

passport.serializeUser((user, hecho)=>{
    hecho(null, user.id);
});

passport.deserializeUser((id, hecho)=>{
    User.findById(id, (err, user)=>{
        hecho(err, user)
    });
});