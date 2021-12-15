'use strict'

const express = require('express');
const ReporteController = require('../controllers/reporte');

const router = express.Router();

router.post('/saveReporte', ReporteController.saveReporte);

router.post('/findReporte', ReporteController.findReporte);

router.post('/findReporteAll', ReporteController.findReporteAll);

router.post('/updateReporte', ReporteController.updateReporte);

router.post('/findAndUpdateReporte', ReporteController.findAndUpdateReporte);

router.post('/deleteReporte', ReporteController.deleteReporte);


module.exports = router;