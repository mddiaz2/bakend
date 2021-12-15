const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CuestionarioSchema = new Schema({
    dimension: { dimension: String, peso: Number, porcentaje_calculado: Number },
    subdimensiones: [{ subdimension: String, peso: Number, porcentaje_calculado: Number }],
    elementos: [{ elemento: String, peso: Number, porcentaje_calculado: Number }],
    metricas: [{ metrica: String, calificacion: Number }],
    preguntas: [{ pregunta: String, respuesta: Number }],
    usuario: {  type: String, required: true},
    nombre: { type: String, required: true},
    fecha: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Cuestionario', CuestionarioSchema);
