const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    nombre: {type: String, required: true},
    correo: { type: String, required: true},
    contraseña: { type: String, required: true},
    fecha: {type: Date, default: Date.now}
});

UserSchema.methods.encryptPassword = async (contraseña)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(contraseña, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (contraseña){
    return await bcrypt.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('users', UserSchema)