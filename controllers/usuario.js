
'use strict';
const User = require('../models/usuario');

const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs');

const controller = {
    saveUser: async function (req, res) {
        var user = new User();
        var params = req.body;
        user.nombre = params.nombre;
        user.email = params.email;
        user.niveleducacion= params.niveleducacion;
        user.password = User.hashPassword(params.password);
        

        user.save((err, userStore) => {
            /* console.log("error ",err);
            console.log("user ",user); */
            if (err) return res.status(500).send({ message: "Error al almacenar la informacion del usuario.","error":err});
            if (!userStore) return res.status(404).send({ message: "No se ha podido almacenar la información del usuario" });
            return res.status(200).send({ user: userStore });
        });

    },

    wellcome: function (req, res) {
        return res.status(200).send("hola");
    }

    ,
    findUser: function (req, res) {
        var user = new User();
        user.password = req.body.password;
        user.email = req.body.email;

        User.findOne({ 'email': user.email }, (err, userFind) => {
            if (err) return res.status(500).send({ message: "Error al consultar la información del usuario." });
            if (!userFind) return res.status(404).send({ message: "las credenciales ingresadas no son correctas." });
            if (userFind) {
                if (User.isValid(user.password,userFind.password)) {
                    //return res.status(200).json({ idUser: userFind.id, token: token, nombresAlumno: userFind.nombres, apellidosAlumno: userFind.apellidos });
                    return res.status(200).json({ userFind});
                    //return res.status(200).json({ idUser: userFind.id, nombresUser: userFind.nombres, apellidosUser: userFind.apellidos });
                } else {
                    return res.status(404).json({ message: 'las credenciales ingresadas no son correctas.' });
                }
                
               
            };

        })
    },

    findUserAll: function (req, res) {
        User.find()
            .then(lista => {
                //token = jwt.sign({ id: lista }, 'chatUtpl2019', { expiresIn: '2h' });
                console.log(lista);
                res.send(lista);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while retrieving this users."
                });
            });
    },

    //metodo asyncrono
    updateUser: async function (req, res) {
        var user = new User();
        user.password = req.body.password;
        user.email = req.body.email;
        console.log(req.body._id);
        //esto demora
        await User.updateOne(
            { _id: req.body._id }, { $set: { nombres: 'I was updated!' } }
        );

        return res.send("actualizo correctamente");
    },

    findAndUpdateUser: function (req, res) {

        User.findOneAndUpdate({
            "_id": req.body._id
        }, {
            'nombre': req.body.nombre
        }, {
            new: true
        }, function (err, userUpdate) {
            if (err) return res.status(500).send({
                message: "Error al actualizar la información del usuario."
            });
            if (!userUpdate) return res.status(404).send({
                message: "No se ha podido almacenar la información actualizada del usuario."
            });
            return res.status(200).send({
                'userActualizado': userUpdate
            });
        });

    },

    deleteUser: function (req, res) {
        User.findOneAndDelete({
            "_id": req.body._id
        }, function (err, userDelete) {
            if (err) console.log(err);
            if (!userDelete) return res.status(404).send({
                message: "No se ha encontrado usuario."
            });
            console.log("usuario eliminado");
            return res.status(200).send(userDelete);
        });

    }


}


module.exports = controller;