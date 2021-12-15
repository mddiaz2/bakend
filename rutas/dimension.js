'use strict'

const express = require('express');
const DimensionController = require('../controllers/dimension');

const router = express.Router();

router.post('/saveDimension', DimensionController.saveDimension);

router.post('/findDimension', DimensionController.findDimension);

router.post('/findDimensionAll', DimensionController.findDimensionAll);

router.post('/findDimensions', DimensionController.findDimensions);

router.post('/updateDimension', DimensionController.updateDimension);

router.post('/findAndUpdateDimension', DimensionController.findAndUpdateDimension);

router.post('/deleteDimension', DimensionController.deleteDimension);


module.exports = router;