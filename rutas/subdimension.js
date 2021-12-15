'use strict'

const express = require('express');
const SubdimensionController = require('../controllers/subdimension');

const router = express.Router();

router.post('/saveSubdimension', SubdimensionController.saveSubdimension);

router.post('/findSubdimension', SubdimensionController.findSubdimension);

router.post('/findSubdimensionAll', SubdimensionController.findSubdimensionAll);

router.post('/updateSubdimension', SubdimensionController.updateSubdimension);

router.post('/findAndUpdateSubdimension', SubdimensionController.findAndUpdateSubdimension);

router.post('/deleteSubdimension', SubdimensionController.deleteSubdimension);


module.exports = router;