const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetricaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    peso: {
        type: Number,
        required: true
    },
    elemento: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Metrica', MetricaSchema);
