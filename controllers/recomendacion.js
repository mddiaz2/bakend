
'use strict';
const Recomendacion= require("../models/recomendacion")

const mongoose = require('mongoose');


const controller = {
    saveRecomendacion: function(req,res){
        var recomendacion = new Recomendacion();
        var params = req.body;
        recomendacion.descripcion = params.descripcion;
        recomendacion.dimension = params.dimension;
        recomendacion.nivelcalculado = params.nivelcalculado;
        recomendacion.save((err, RecomendacionStore) => {
            //console.log(Recomendacion);
            if (err) return res.status(500).send({ message: "Error al almacenar la informacion de Recomendacion.","error":err });
            if (!RecomendacionStore) return res.status(404).send({ message: "No se ha podido almacenar la información del usuario" });
            return res.status(200).send({ Recomendacion: RecomendacionStore });
        });
    },

    findRecomendacion: async function (req, res) {
            let nombre = req.body.nombre;
            let nivelcalculado = req.body.nivelcalculado;
            let recomendaciones=await Recomendacion.find({"dimension":nombre,"nivelcalculado":nivelcalculado});
            return res.status(200).json({ "recomendaciones": recomendaciones});
            //return res.status(200).json({ "recomendaciones": recomendaciones });
    },

    findRecomendacionAll: function (req, res) {
        Recomendacion.find()
            .then(lista => {
                //token = jwt.sign({ id: lista }, 'chatUtpl2019', { expiresIn: '2h' });
                console.log(lista);
                res.send(lista);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while retrieving this Recomendacions."
                });
            });
    },

    //metodo asyncrono
    updateRecomendacion:async function(req,res){
        var recomendacion=new Recomendacion();
        recomendacion.total= req.body.total;
        recomendacion.porcentaje=req.body.porcentaje;
        //console.log(req.body._id);
        //esto demora
        await Recomendacion.updateOne(
            { _id: req.body._id }, { $set: { nombre: 'I was updated!' } }
          );

        return res.send("actualizo correctamente");
    },

    findAndUpdateRecomendacion: function(req,res){

    Recomendacion.findOneAndUpdate({
        "_id":req.body._id
    }, {
        'nombre':req.body.nombre,'peso':req.body.peso
    }, {
        new :true
    }, function(err,RecomendacionUpdate){
        if (err) return res.status(500).send({
            message: "Error al actualizar la información del usuario."
        });
        if (!RecomendacionUpdate) return res.status(404).send({
            message: "No se ha podido almacenar la información actualizada del usuario."
        });
        return res.status(200).send({
            'RecomendacionActualizado': RecomendacionUpdate
        });
    });

    },

    deleteRecomendacion: function(req,res){
        Recomendacion.findOneAndDelete({
            "_id":req.body._id
        }, function(err,RecomendacionDelete){
            if (err) console.log(err);
            if (!RecomendacionDelete) return res.status(404).send({
                message: "No se ha encontrado usuario."
            });
            console.log("usuario eliminado");
            return res.status(200).send(RecomendacionDelete);
        });

    }

    
}


module.exports=controller;