const models = require('./models');
const services = require('./services');
const BaseController = require('./../config/base-controller');
const { asyncErrorHandler } = require('./../config/error-handlers');


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
