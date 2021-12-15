'use strict'

const express = require('express');
const MetricaController = require('../controllers/metrica');

const router = express.Router();

router.post('/saveMetrica', MetricaController.saveMetrica);

router.post('/findMetrica', MetricaController.findMetrica);

router.post('/findMetricaAll', MetricaController.findMetricaAll);

router.post('/updateMetrica', MetricaController.updateMetrica);

router.post('/findAndUpdateMetrica', MetricaController.findAndUpdateMetrica);

router.post('/deleteMetrica', MetricaController.deleteMetrica);


module.exports = router;