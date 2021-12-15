const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreguntaSchema = new Schema({

    /* respuesta: {
        type: Number,
        required: true
    }, */
    metrica: {
        type: String,
        required: true
    },
    pregunta: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Pregunta', PreguntaSchema);
