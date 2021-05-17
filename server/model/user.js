const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let enumcivilstatus = {
    values: ['Casado/a', 'Soltero/a', 'Divorciado/a', 'Viudo/a'],
    message: '{VALUE} no es un estado civil válido'
}

let enumgender = {
    values: ['Masculino', 'Femenino'],
    message: '{VALUE} no es un estado civil válido'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del Usuario es requerido'],
    },
    lastname: { type: String },
    username: { type: String },
    idcard: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    tangramname: { type: String, required: true },
    colors: { type: Array, required: true },
    telephone: { type: String },
    phone: { type: String },
    birthday: { type: String },
    direction: { type: String },
    country: { type: String },
    province: { type: String },
    city: { type: String },
    civilstatus: { type: String, enum: enumcivilstatus },
    gender: { type: String, enum: enumgender },
    ruleid: { type: Number }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('User', userSchema);