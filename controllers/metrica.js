
'use strict';
const Metrica= require("../models/metrica")

const mongoose = require('mongoose');


const controller = {
    saveMetrica: function(req,res){
        var metrica = new Metrica();
        var params = req.body;
        metrica.nombre = params.nombre;
        metrica.peso = params.peso;
        metrica.elemento = params.elemento ;

        metrica.save((err, MetricaStore) => {
            //console.log(Metrica);
            if (err) return res.status(500).send({ message: "Error al almacenar la informacion de Metrica.","error":err });
            if (!MetricaStore) return res.status(404).send({ message: "No se ha podido almacenar la información del usuario" });
            return res.status(200).send({ Metrica: MetricaStore });
        });

    },

    findMetrica: function (req, res) {
        var metrica=new Metrica();
        metrica.nombre= req.body.nombre;

        Metrica.findOne({ 'nombre': Metrica.nombre }, (err, MetricaFind) => {
            if (err) return res.status(500).send({ message: "Error al consultar la información de Metrica." });
            if (!MetricaFind) return res.status(404).send({ message: "las credenciales ingresadas no son correctas." });
            if (MetricaFind) {    
                return res.status(200).json({ MetricaFind});
            };
            
        })
    },

    findMetricaAll: function (req, res) {
        Metrica.find()
            .then(lista => {
                //token = jwt.sign({ id: lista }, 'chatUtpl2019', { expiresIn: '2h' });
                console.log(lista);
                res.send(lista);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while retrieving this Metricas."
                });
            });
    },

    //metodo asyncrono
    updateMetrica:async function(req,res){
        var metrica=new Metrica();
        metrica.total= req.body.total;
        metrica.porcentaje=req.body.porcentaje;
        console.log(req.body._id);
        //esto demora
        await Metrica.updateOne(
            { _id: req.body._id }, { $set: { nombre: 'I was updated!' } }
          );

        return res.send("actualizo correctamente");
    },

    findAndUpdateMetrica: function(req,res){

    Metrica.findOneAndUpdate({
        "_id":req.body._id
    }, {
        'nombre':req.body.nombre,'peso':req.body.peso
    }, {
        new :true
    }, function(err,MetricaUpdate){
        if (err) return res.status(500).send({
            message: "Error al actualizar la información del usuario."
        });
        if (!MetricaUpdate) return res.status(404).send({
            message: "No se ha podido almacenar la información actualizada del usuario."
        });
        return res.status(200).send({
            'MetricaActualizado': MetricaUpdate
        });
    });

    },

    deleteMetrica: function(req,res){
        Metrica.findOneAndDelete({
            "_id":req.body._id
        }, function(err,MetricaDelete){
            if (err) console.log(err);
            if (!MetricaDelete) return res.status(404).send({
                message: "No se ha encontrado usuario."
            });
            console.log("usuario eliminado");
            return res.status(200).send(MetricaDelete);
        });

    }

    
}


module.exports=controller;