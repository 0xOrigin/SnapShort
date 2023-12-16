const models = require('./models');
const services = require('./services');
const BaseController = require('./../snapshort-backend/baseController');
const { asyncErrorHandler } = require('./../snapshort-backend/errorHandlers');


class UrlController extends BaseController {
    
    constructor() {
        super(models.Url, services.UrlService);
    }

    retrieve = asyncErrorHandler(async (req, res, next) => {
        const url = await this.service.retrieve(req);
        res.redirect(url.url);
    });

    details = asyncErrorHandler(async (req, res, next) => {
        const url = await this.service.retrieveOne(req);
        res.jsonResponse(url, 200);
    });
}


module.exports = {
    UrlController,
};
