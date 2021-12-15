'use strict'

const express = require('express');
const RecomendacionController = require('../controllers/recomendacion');

const router = express.Router();

router.post('/saveRecomendacion', RecomendacionController.saveRecomendacion);

router.post('/findRecomendacion', RecomendacionController.findRecomendacion);

router.post('/findRecomendacionAll', RecomendacionController.findRecomendacionAll);

router.post('/updateRecomendacion', RecomendacionController.updateRecomendacion);

router.post('/findAndUpdateRecomendacion', RecomendacionController.findAndUpdateRecomendacion);

router.post('/deleteRecomendacion', RecomendacionController.deleteRecomendacion);


module.exports = router;