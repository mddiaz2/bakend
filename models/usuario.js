const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    niveleducacion: {
        type: String,
        required: true
    },
});


UserSchema.statics.hashPassword = function hashPassword(password){
    return bcryptjs.hashSync(password, 10);
};

UserSchema.statics.isValid = function(password,hashedPassword){

    return bcryptjs.compareSync(password,hashedPassword);
};

module.exports = mongoose.model('User', UserSchema);
