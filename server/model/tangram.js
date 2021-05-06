const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let tangramSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    figuras1: { type: String },
    figuras2: { type: String },
    figuras3: { type: String },
    figuras4: { type: String },
    figuras5: { type: String }
});

tangramSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('tangram', tangramSchema);