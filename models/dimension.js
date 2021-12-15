const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DimensionSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    peso: {
        type: Number,
        required: true
    },
    /* porcentaje_calculado: {
        type: Number,
        required: true,
        //unique: true
    },
    promedio: {
        type: Number,
        required: true
    }, */
    /* integerOnly: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        alias: 'i'
      } */
    
});


module.exports = mongoose.model('Dimension', DimensionSchema);
