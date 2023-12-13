const path = require('path');
const express = require('express');
const router = express.Router();
const models = require(path.resolve(__dirname, './../../models'));


router.get('/', async (req, res, next) => {
    try {
        res.jsonResponse(null, 200);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
