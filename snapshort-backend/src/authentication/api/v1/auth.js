const express = require('express');
const router = express.Router();
const { AuthController } = require('./../../controllers');

controller = new AuthController();

router.post('/login', controller.login);

module.exports = router;
