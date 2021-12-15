const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecomendacionSchema = new Schema({
    descripcion:[String],
    nivelcalculado: {
        type: String,
        required: true
    },
    dimension: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Recomendacion', RecomendacionSchema);
