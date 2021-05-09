const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del Usuario es requerido'],
        unique: true
    },
    apellido: { type: String },
    correo: { type: String },
    contrasena: { type: String },
    id_tagram: { type: String,required:true ,unique:true},
    colores: { type: String,required:true }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('User', userSchema);