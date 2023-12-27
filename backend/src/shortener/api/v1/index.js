const express = require('express');
const router = express.Router();
const urlRouter = require('./url');


router.use('/urls', urlRouter);


module.exports = router;
