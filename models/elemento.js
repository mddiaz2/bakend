const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ElementoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    /* peso: {
        type: Number,
        required: true
    },
    porcentaje_calculado: {
        type: Number,
        required: true,
        //unique: true
    }, */
    subdimension: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Elemento', ElementoSchema);
