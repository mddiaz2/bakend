'use strict'

const express = require('express');
const ElementoController = require('../controllers/elemento');

const router = express.Router();

router.post('/saveElemento', ElementoController.saveElemento);

router.post('/findElemento', ElementoController.findElemento);

router.post('/findElementoAll', ElementoController.findElementoAll);

router.post('/updateElemento', ElementoController.updateElemento);

router.post('/findAndUpdateElemento', ElementoController.findAndUpdateElemento);

router.post('/deleteElemento', ElementoController.deleteElemento);


module.exports = router;