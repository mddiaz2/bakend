'use strict'

const express = require('express');
const UserController = require('../controllers/usuario');

const router = express.Router();

router.post('/saveUser', UserController.saveUser);

router.post('/wellcome', UserController.wellcome);

router.post('/findUser', UserController.findUser);

router.post('/findUserAll', UserController.findUserAll);

router.post('/updateUser', UserController.updateUser);

router.post('/findAndUpdateUser', UserController.findAndUpdateUser);

router.post('/deleteUser', UserController.deleteUser);


module.exports = router;