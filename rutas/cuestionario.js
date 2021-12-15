'use strict'

const express = require('express');
const CuestionarioController = require('../controllers/cuestionario');

const router = express.Router();

router.post('/saveCuestionario', CuestionarioController.saveCuestionario);

router.post('/findCuestionarioUser', CuestionarioController.findCuestionarioUser);

router.post('/findCuestionarioAll', CuestionarioController.findCuestionarioAll);

router.post('/findCuestionarioDimension', CuestionarioController.findCuestionarioDimension);

router.post('/updateCuestionario', CuestionarioController.updateCuestionario);

router.post('/findAndUpdateCuestionario', CuestionarioController.findAndUpdateCuestionario);

router.post('/deleteCuestionario', CuestionarioController.deleteCuestionario);


module.exports = router;