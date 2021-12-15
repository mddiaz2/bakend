const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReporteSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    promedio_calculado: {
        type: Number,
        required: true
    },
    nivelcalculado: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Reporte', ReporteSchema);
