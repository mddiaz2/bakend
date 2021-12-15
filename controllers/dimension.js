
'use strict';
const Dimension= require("../models/dimension")
const Cuestionario = require("../models/Cuestionario");
const mongoose = require('mongoose');


const controller = {
    saveDimension: function(req,res){
        var dimension = new Dimension();
        var params = req.body;
        dimension.nombre = params.nombre;
        dimension.peso = params.peso;
        /* dimension.porcentaje_calculado = params.porcentaje_calculado;
        dimension.promedio = params.promedio; */

        dimension.save((err, DimensionStore) => {
            //console.log(Dimension);

            if (err) return res.status(500).send({ message: "Error al almacenar la informacion de Dimension.","error":err });
            if (!DimensionStore) return res.status(404).send({ message: "No se ha podido almacenar la información del usuario" });
            return res.status(200).send({ Dimension: DimensionStore });
        });

    },

    findDimension: function (req, res) {
        var Dimension=new Dimension();
        Dimension.nombre= req.body.nombre;

        Dimension.findOne({ 'nombre': Dimension.nombre }, (err, DimensionFind) => {
            if (err) return res.status(500).send({ message: "Error al consultar la información de Dimension." });
            if (!DimensionFind) return res.status(404).send({ message: "las credenciales ingresadas no son correctas." });
            if (DimensionFind) {    
                return res.status(200).json({ DimensionFind});
            };
            
        })
    },

    findDimensionAll: function (req, res) {
        Dimension.find()
            .then(lista => {
                //token = jwt.sign({ id: lista }, 'chatUtpl2019', { expiresIn: '2h' });
                //console.log(lista);
                res.send(lista);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while retrieving this Dimensions."
                });
            });
    },

    findDimensions: async function (req, res) {
        //let dimension = req.body.nombre;
        let usuario = req.body.usuario;
        let dimensiones=await Dimension.find({})

        console.log("usuario ",usuario);
        //console.log("dimensiones ",dimensiones);
        //let dimensiones = await Cuestionario.find({"_id":"61b3b35871cd42117e0fb14c"});
        let sendDimensiones=[]
        for (let index = 0; index < dimensiones.length; index++) {
            let element = dimensiones[index];
            
            let cuestionario = await Cuestionario.find({'nombre':element.nombre,"usuario":usuario});
            //console.log("cuestionario ",typeof cuestionario)
            //console.log("cuestionario ",cuestionario[0])
            if(cuestionario[0]==undefined){
                sendDimensiones.push(element);
            }
            /* for (let index = 0; index < cuestionario[0].length; index++) {
                const element1 = array[index].nombre;
                console.log("cuestionario ",element1)
            } */
            //sendDimensiones.push(cuestionario);
        
        }
        console.log("dimensiones restantes ",sendDimensiones);
        
        
        //const countQuery = await Cuestionario.where({ 'dimension': 'Dinamismo Estrategico' }).within().circle(area)
        //console.log("cuestionario ",dimensiones)
        return res.status(200).json({"dimensiones":sendDimensiones});
        //return res.send("actualizo correctamente");
    },

    //metodo asyncrono
    updateDimension:async function(req,res){
        var Dimension=new Dimension();
        Dimension.total= req.body.total;
        Dimension.porcentaje=req.body.porcentaje;
        console.log(req.body._id);
        //esto demora
        await Dimension.updateOne(
            { _id: req.body._id }, { $set: { nombre: 'I was updated!' } }
          );

        return res.send("actualizo correctamente");
    },

    findAndUpdateDimension: function(req,res){

    Dimension.findOneAndUpdate({
        "_id":req.body._id
    }, {
        'nombre':req.body.nombre,'peso':req.body.peso
    }, {
        new :true
    }, function(err,DimensionUpdate){
        if (err) return res.status(500).send({
            message: "Error al actualizar la información del usuario."
        });
        if (!DimensionUpdate) return res.status(404).send({
            message: "No se ha podido almacenar la información actualizada del usuario."
        });
        return res.status(200).send({
            'DimensionActualizado': DimensionUpdate
        });
    });

    },

    deleteDimension: function(req,res){
        Dimension.findOneAndDelete({
            "_id":req.body._id
        }, function(err,DimensionDelete){
            if (err) console.log(err);
            if (!DimensionDelete) return res.status(404).send({
                message: "No se ha encontrado usuario."
            });
            console.log("usuario eliminado");
            return res.status(200).send(DimensionDelete);
        });

    }

    
}


module.exports=controller;