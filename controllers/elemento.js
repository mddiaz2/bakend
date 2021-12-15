
'use strict';
const Elemento= require("../models/elemento")

const mongoose = require('mongoose');


const controller = {
    saveElemento: function(req,res){
        var elemento = new Elemento();
        var params = req.body;
        elemento.nombre = params.nombre;
        elemento.peso = params.peso;
        /* elemento.peso = params.peso;
        elemento.porcentaje_calculado = params.porcentaje_calculado; */
        elemento.subdimension = params.subdimension;

        elemento.save((err, ElementoStore) => {
            //console.log(Elemento);

            if (err) return res.status(500).send({ message: "Error al almacenar la informacion de Elemento.","error":err });
            if (!ElementoStore) return res.status(404).send({ message: "No se ha podido almacenar la información del usuario" });
            return res.status(200).send({ Elemento: ElementoStore });
        });

    },

    findElemento: function (req, res) {
        var Elemento=new Elemento();
        Elemento.nombre= req.body.nombre;

        Elemento.findOne({ 'nombre': Elemento.nombre }, (err, ElementoFind) => {
            if (err) return res.status(500).send({ message: "Error al consultar la información de Elemento." });
            if (!ElementoFind) return res.status(404).send({ message: "las credenciales ingresadas no son correctas." });
            if (ElementoFind) {    
                return res.status(200).json({ ElementoFind});
            };
            
        })
    },

    findElementoAll: function (req, res) {
        Elemento.find()
            .then(lista => {
                //token = jwt.sign({ id: lista }, 'chatUtpl2019', { expiresIn: '2h' });
                console.log(lista);
                res.send(lista);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while retrieving this Elementos."
                });
            });
    },

    //metodo asyncrono
    updateElemento:async function(req,res){
        var Elemento=new Elemento();
        Elemento.total= req.body.total;
        Elemento.porcentaje=req.body.porcentaje;
        console.log(req.body._id);
        //esto demora
        await Elemento.updateOne(
            { _id: req.body._id }, { $set: { nombre: 'I was updated!' } }
          );

        return res.send("actualizo correctamente");
    },

    findAndUpdateElemento: function(req,res){

    Elemento.findOneAndUpdate({
        "_id":req.body._id
    }, {
        'nombre':req.body.nombre,'peso':req.body.peso
    }, {
        new :true
    }, function(err,ElementoUpdate){
        if (err) return res.status(500).send({
            message: "Error al actualizar la información del usuario."
        });
        if (!ElementoUpdate) return res.status(404).send({
            message: "No se ha podido almacenar la información actualizada del usuario."
        });
        return res.status(200).send({
            'ElementoActualizado': ElementoUpdate
        });
    });

    },

    deleteElemento: function(req,res){
        Elemento.findOneAndDelete({
            "_id":req.body._id
        }, function(err,ElementoDelete){
            if (err) console.log(err);
            if (!ElementoDelete) return res.status(404).send({
                message: "No se ha encontrado usuario."
            });
            console.log("usuario eliminado");
            return res.status(200).send(ElementoDelete);
        });

    }

    
}


module.exports=controller;