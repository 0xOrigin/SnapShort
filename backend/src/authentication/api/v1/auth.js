const express = require('express');
const router = express.Router();
const { AuthController, handleRefreshToken } = require('../../controllers');

controller = new AuthController();

router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.post('/token/refresh', handleRefreshToken);


module.exports = router;
