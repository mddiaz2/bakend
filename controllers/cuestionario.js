
'use strict';


//classes
const Cuestionario = require("../models/Cuestionario");
const Subdimension= require("../models/subdimesion")
const Elemento= require("../models/elemento")
const Metrica= require("../models/metrica")
const Pregunta= require("../models/pregunta")

//controlladores
//const SubdimensionController = require('../controllers/subdimension');

const mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');


const controller = {
    saveCuestionario: function (req, res) {
        var cuestionario = new Cuestionario();
        var params = req.body;
        cuestionario.dimension = params.dimension;
        cuestionario.subdimensiones = params.subdimensiones;
        cuestionario.elementos = params.elementos;
        cuestionario.metricas = params.metricas;
        cuestionario.preguntas = params.preguntas;
        cuestionario.usuario = params.usuario;
        cuestionario.nombre = params.nombre;

        cuestionario.save((err, CuestionarioStore) => {
            //console.log(Cuestionario);

            if (err) return res.status(500).send({ message: "Error al almacenar la informacion de Cuestionario.", "error": err });
            if (!CuestionarioStore) return res.status(404).send({ message: "No se ha podido almacenar la información del usuario" });
            return res.status(200).send({ Cuestionario: CuestionarioStore });
        });

    },

    findCuestionarioUser: async function (req, res) {
        let nombre = req.body.nombre;
        let cuestionarios=await Cuestionario.find({"usuario":nombre});
        let subdimensiones=[];
        for (let index = 0; index < cuestionarios.length; index++) {
            const element = cuestionarios[index];
            let valor=0;
            //console.log("dimension ",element.nombre);
            for (let index = 0; index < element.subdimensiones.length; index++) {
                const element1 = element.subdimensiones[index];
                valor=valor+element1.porcentaje_calculado;
                //console.log("subdimension ",element1);
            }
            valor = Math.round(valor);
            subdimensiones.push({"dimension":element.nombre,"valor":valor});
        }
        return res.status(200).json({"dimension":subdimensiones});
        //return res.status(500).json({"mensaje":"error en la consulta"});
    },

    findCuestionarioAll: function (req, res) {
        Cuestionario.find()
            .then(lista => {
                //token = jwt.sign({ id: lista }, 'chatUtpl2019', { expiresIn: '2h' });
                //console.log(lista);
                res.send(lista);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while retrieving this Cuestionarios."
                });
            });
    },

    findCuestionarioDimension: async function (req, res) {
        let dimension = req.body.nombre;
        //console.log(" dimension  ",dimension);
        let subdimensiones = await Subdimension.find({"dimension":dimension})
        //console.log("subdimensiones ",subdimensiones);
        let elementos=[]
        for (let index = 0; index < subdimensiones.length; index++) {
            const element = subdimensiones[index].nombre;
            let listElementos=await Elemento.find({"subdimension":element});
            elementos.push({key:element,value:listElementos});
        }
        /* console.log(" --------- ");
        console.log(" metricas ",elementos); */
        let metricas=[]
        for (let index = 0; index < elementos.length; index++) {
            const element =elementos[index];
            //console.log(" index ",index,"   element ",element.value,"  size ",element.key);
            for (let index1 = 0; index1 < element.value.length;index1++) {
                const element1 = element.value[index1];
                let listMetrica=await Metrica.find({"elemento":element1.nombre});
                metricas.push({key:element1.nombre,value:listMetrica})
            }
        } 
        /* console.log(" --------- ");
        console.log(" metricas ",metricas); */
        let preguntas=[]
        for (let index = 0; index < metricas.length; index++) {
            const element =metricas[index].value;
            let listMetrica;
            let metrica;
            for (let index = 0; index < element.length; index++) {
                const element1 = element[index];
                metrica=element1.nombre;
                console.log("metrica ",element1.nombre);
                listMetrica=await Pregunta.findOne({"metrica":element1.nombre});
            }
            //console.log(" index ",index,"   element ",element.value,"  size ",element.key);
           
            preguntas.push({key:metrica,value:listMetrica})
        } 
        //console.log(" --------- ");
        //console.log(" preguntas",preguntas);
        
        if(subdimensiones.length>0&&elementos.length>0&&metricas.length>0&&preguntas.length>0){
            return res.status(200).json({"subdimensiones":subdimensiones,"elementos":elementos,"metricas":metricas,"preguntas":preguntas});
            //return res.status(200).json({"mensaje":"correcta la consulta"});
        }else{
            return res.status(500).json({"mensaje":"error en la consulta"});
        }        
    },

    //metodo asyncrono
    updateCuestionario: async function (req, res) {
        var Cuestionario = new Cuestionario();
        Cuestionario.total = req.body.total;
        Cuestionario.porcentaje = req.body.porcentaje;
        //console.log(req.body._id);
        //esto demora
        await Cuestionario.updateOne(
            { _id: req.body._id }, { $set: { nombre: 'I was updated!' } }
        );

        return res.send("actualizo correctamente");
    },

    findAndUpdateCuestionario: function (req, res) {

        Cuestionario.findOneAndUpdate({
            "_id": req.body._id
        }, {
            'nombre': req.body.nombre, 'peso': req.body.peso
        }, {
            new: true
        }, function (err, CuestionarioUpdate) {
            if (err) return res.status(500).send({
                message: "Error al actualizar la información del usuario."
            });
            if (!CuestionarioUpdate) return res.status(404).send({
                message: "No se ha podido almacenar la información actualizada del usuario."
            });
            return res.status(200).send({
                'CuestionarioActualizado': CuestionarioUpdate
            });
        });

    },

    deleteCuestionario: function (req, res) {
        Cuestionario.findOneAndDelete({
            "_id": req.body._id
        }, function (err, CuestionarioDelete) {
            if (err) console.log(err);
            if (!CuestionarioDelete) return res.status(404).send({
                message: "No se ha encontrado usuario."
            });
            console.log("usuario eliminado");
            return res.status(200).send(CuestionarioDelete);
        });

    }

}


module.exports = controller;