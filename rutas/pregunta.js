'use strict'

const express = require('express');
const PreguntaController = require('../controllers/pregunta');

const router = express.Router();

router.post('/savePregunta', PreguntaController.savePregunta);

router.post('/findPregunta', PreguntaController.findPregunta);

router.post('/findPreguntaAll', PreguntaController.findPreguntaAll);

router.post('/updatePregunta', PreguntaController.updatePregunta);

router.post('/findAndUpdatePregunta', PreguntaController.findAndUpdatePregunta);

router.post('/deletePregunta', PreguntaController.deletePregunta);


module.exports = router;