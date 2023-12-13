const path = require('path');
const express = require('express');
const router = express.Router();
const authenticationApp = require(path.resolve(__dirname, './../authentication'));
const shortenerApp = require(path.resolve(__dirname, './../shortener'));
const { AppError } = require('./errorHandlers');


router.use('/auth', authenticationApp);
router.use('/shortener', shortenerApp.routes);


router.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


module.exports = router;
