
'use strict';
const Reporte= require("../models/reporte")

const mongoose = require('mongoose');


const controller = {
    saveReporte: function(req,res){
        var reporte = new Reporte();
        var params = req.body;
        reporte.nombre = params.nombre;
        reporte.peso = params.peso;
        reporte.nivelcalculado = params.nivelcalculado ;

        Reporte.save((err, ReporteStore) => {
            //console.log(Reporte);
            if (err) return res.status(500).send({ message: "Error al almacenar la informacion de Reporte.","error":err });
            if (!ReporteStore) return res.status(404).send({ message: "No se ha podido almacenar la información del usuario" });
            return res.status(200).send({ Reporte: ReporteStore });
        });
    },

    findReporte: function (req, res) {
        var Reporte=new Reporte();
        Reporte.nombre= req.body.nombre;

        Reporte.findOne({ 'nombre': Reporte.nombre }, (err, ReporteFind) => {
            if (err) return res.status(500).send({ message: "Error al consultar la información de Reporte." });
            if (!ReporteFind) return res.status(404).send({ message: "las credenciales ingresadas no son correctas." });
            if (ReporteFind) {    
                return res.status(200).json({ ReporteFind});
            };
            
        })
    },

    findReporteAll: function (req, res) {
        Reporte.find()
            .then(lista => {
                //token = jwt.sign({ id: lista }, 'chatUtpl2019', { expiresIn: '2h' });
                console.log(lista);
                res.send(lista);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while retrieving this Reportes."
                });
            });
    },

    //metodo asyncrono
    updateReporte:async function(req,res){
        var Reporte=new Reporte();
        Reporte.total= req.body.total;
        Reporte.porcentaje=req.body.porcentaje;
        console.log(req.body._id);
        //esto demora
        await Reporte.updateOne(
            { _id: req.body._id }, { $set: { nombre: 'I was updated!' } }
          );

        return res.send("actualizo correctamente");
    },

    findAndUpdateReporte: function(req,res){

    Reporte.findOneAndUpdate({
        "_id":req.body._id
    }, {
        'nombre':req.body.nombre,'peso':req.body.peso
    }, {
        new :true
    }, function(err,ReporteUpdate){
        if (err) return res.status(500).send({
            message: "Error al actualizar la información del usuario."
        });
        if (!ReporteUpdate) return res.status(404).send({
            message: "No se ha podido almacenar la información actualizada del usuario."
        });
        return res.status(200).send({
            'ReporteActualizado': ReporteUpdate
        });
    });

    },

    deleteReporte: function(req,res){
        Reporte.findOneAndDelete({
            "_id":req.body._id
        }, function(err,ReporteDelete){
            if (err) console.log(err);
            if (!ReporteDelete) return res.status(404).send({
                message: "No se ha encontrado usuario."
            });
            console.log("usuario eliminado");
            return res.status(200).send(ReporteDelete);
        });

    }

    
}


module.exports=controller;