const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del Usuario es requerido'],
    },
    lastname: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    tangramname: { type: String, required: true },
    colors: { type: Array, required: true }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('User', userSchema);