
'use strict';
const Subdimension= require("../models/subdimesion")

const mongoose = require('mongoose');


const controller = {
    saveSubdimension: function(req,res){
        var subdimension = new Subdimension();
        var params = req.body;
        subdimension.nombre = params.nombre;
        subdimension.peso = params.peso;
        /* subdimension.peso = params.peso;
        subdimension.porcentaje_calculado = params.porcentaje_calculado; */
        subdimension.dimension = params.dimension;

        subdimension.save((err, SubdimensionStore) => {
            //console.log(Subdimension);

            if (err) return res.status(500).send({ message: "Error al almacenar la informacion de Subdimension.","error":err });
            if (!SubdimensionStore) return res.status(404).send({ message: "No se ha podido almacenar la información del usuario" });
            return res.status(200).send({ Subdimension: SubdimensionStore });
        });

    },

    findSubdimension: function (req, res) {
        var subdimension=new Subdimension();
        subdimension.nombre= req.body.nombre;

        Subdimension.findOne({ 'nombre': Subdimension.nombre }, (err, SubdimensionFind) => {
            if (err) return res.status(500).send({ message: "Error al consultar la información de Subdimension." });
            if (!SubdimensionFind) return res.status(404).send({ message: "las credenciales ingresadas no son correctas." });
            if (SubdimensionFind) {    
                return res.status(200).json({ SubdimensionFind});
            };
            
        })
    },

    findSubdimensionAll: function (req, res) {
        Subdimension.find()
            .then(lista => {
                //token = jwt.sign({ id: lista }, 'chatUtpl2019', { expiresIn: '2h' });
                console.log(lista);
                res.send(lista);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while retrieving this Subdimensions."
                });
            });
    },

    //metodo asyncrono
    updateSubdimension:async function(req,res){
        var Subdimension=new Subdimension();
        Subdimension.total= req.body.total;
        Subdimension.porcentaje=req.body.porcentaje;
        console.log(req.body._id);
        //esto demora
        await Subdimension.updateOne(
            { _id: req.body._id }, { $set: { nombre: 'I was updated!' } }
          );

        return res.send("actualizo correctamente");
    },

    findAndUpdateSubdimension: function(req,res){

    Subdimension.findOneAndUpdate({
        "_id":req.body._id
    }, {
        'nombre':req.body.nombre,'peso':req.body.peso
    }, {
        new :true
    }, function(err,SubdimensionUpdate){
        if (err) return res.status(500).send({
            message: "Error al actualizar la información del usuario."
        });
        if (!SubdimensionUpdate) return res.status(404).send({
            message: "No se ha podido almacenar la información actualizada del usuario."
        });
        return res.status(200).send({
            'SubdimensionActualizado': SubdimensionUpdate
        });
    });

    },

    deleteSubdimension: function(req,res){
        Subdimension.findOneAndDelete({
            "_id":req.body._id
        }, function(err,SubdimensionDelete){
            if (err) console.log(err);
            if (!SubdimensionDelete) return res.status(404).send({
                message: "No se ha encontrado usuario."
            });
            console.log("usuario eliminado");
            return res.status(200).send(SubdimensionDelete);
        });

    }

    
}


module.exports=controller;