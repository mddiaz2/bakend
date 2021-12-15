
'use strict';
const Pregunta= require("../models/pregunta")

const mongoose = require('mongoose');


const controller = {
    savePregunta: function(req,res){
        var pregunta = new Pregunta();
        var params = req.body;
        //pregunta.descripcion = params.descripcion;
        //pregunta.respuesta = params.respuesta;
        pregunta.metrica = params.metrica;
        pregunta.pregunta = params.pregunta;

        pregunta.save((err, PreguntaStore) => {
            //console.log(Pregunta);

            if (err) return res.status(500).send({ message: "Error al almacenar la informacion de Pregunta.","error":err });
            if (!PreguntaStore) return res.status(404).send({ message: "No se ha podido almacenar la información del usuario" });
            return res.status(200).send({ Pregunta: PreguntaStore });
        });

    },

    findPregunta: function (req, res) {
        var Pregunta=new Pregunta();
        Pregunta.nivelcalculado= req.body.nivelcalculado;

        Pregunta.findOne({ 'nombre': Pregunta.nombre }, (err, PreguntaFind) => {
            if (err) return res.status(500).send({ message: "Error al consultar la información de Pregunta." });
            if (!PreguntaFind) return res.status(404).send({ message: "las credenciales ingresadas no son correctas." });
            if (PreguntaFind) {    
                return res.status(200).json({ PreguntaFind});
            };
            
        })
    },

    findPreguntaAll: function (req, res) {
        Pregunta.find()
            .then(lista => {
                //token = jwt.sign({ id: lista }, 'chatUtpl2019', { expiresIn: '2h' });
                console.log(lista);
                res.send(lista);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while retrieving this Preguntas."
                });
            });
    },

    //metodo asyncrono
    updatePregunta:async function(req,res){
        var Pregunta=new Pregunta();
        Pregunta.total= req.body.total;
        Pregunta.porcentaje=req.body.porcentaje;
        //console.log(req.body._id);
        //esto demora
        await Pregunta.updateOne(
            { _id: req.body._id }, { $set: { nombre: 'I was updated!' } }
          );

        return res.send("actualizo correctamente");
    },

    findAndUpdatePregunta: function(req,res){

    Pregunta.findOneAndUpdate({
        "_id":req.body.nombre
    }, {
       
        'respuesta':req.body.respuesta
    }, {
        new :true
    }, function(err,PreguntaUpdate){
        if (err) return res.status(500).send({
            message: "Error al actualizar la información del usuario."
        });
        if (!PreguntaUpdate) return res.status(404).send({
            message: "No se ha podido almacenar la información actualizada del usuario."
        });
        return res.status(200).send({
            'PreguntaActualizado': PreguntaUpdate
        });
    });

    },

    deletePregunta: function(req,res){
        Pregunta.findOneAndDelete({
            "_id":req.body._id
        }, function(err,PreguntaDelete){
            if (err) console.log(err);
            if (!PreguntaDelete) return res.status(404).send({
                message: "No se ha encontrado usuario."
            });
            console.log("usuario eliminado");
            return res.status(200).send(PreguntaDelete);
        });

    }

    
}


module.exports=controller;