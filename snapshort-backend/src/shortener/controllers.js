const path = require('path');
const models = require('./models');
const { asyncErrorHandler } = require(path.resolve(__dirname, './../snapshort-backend/errorHandlers'));


const getUrls = asyncErrorHandler(async (req, res, next) => {
    const urls = await models.Url.findAll();
    res.jsonResponse(urls, 200);
});


const getUrl = asyncErrorHandler(async (req, res, next) => {
    const url = await models.Url.findOne({
        where: {
            urlCode: req.params.urlCode
        }
    });
    await url.increment('clicks');
    res.redirect(url.url);
});


const getUrlDetails = asyncErrorHandler(async (req, res, next) => {
    const url = await models.Url.findOne({
        where: {
            urlCode: req.params.urlCode
        }
    });
    res.jsonResponse(url, 200);
});


const createUrl = asyncErrorHandler(async (req, res, next) => {
    const url = await models.Url.create({
        url: req.body.url
    });
    res.jsonResponse(url, 201);
});


const destroyUrl = asyncErrorHandler(async (req, res, next) => {
    const url = await models.Url.destroy({
        where: {
            urlCode: req.params.urlCode
        }
    });
    res.jsonResponse(null, 204);
});


module.exports = {
    getUrls,
    getUrl,
    getUrlDetails,
    createUrl,
    destroyUrl
};
