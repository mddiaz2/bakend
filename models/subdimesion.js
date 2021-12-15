const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubdimensionSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    peso: {
        type: Number,
        required: true
    },
    dimension: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Subdimension', SubdimensionSchema);
