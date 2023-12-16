const { asyncErrorHandler } = require('./errorHandlers');

class BaseController {

  constructor(model, serviceClass) {
    this.model = model;
    this.serviceClass = serviceClass;
    this.service = this.serviceClass ? new this.serviceClass() : null;
  }

  list = asyncErrorHandler(async (req, res, next) => {
    const users = await this.service.list(req);
    res.jsonResponse(users, 200);
  });

  retrieve = asyncErrorHandler(async (req, res, next) => {
    const user = await this.service.retrieve(req);
    res.jsonResponse(user, 200);
  });

  create = asyncErrorHandler(async (req, res, next) => {
    const user = await this.service.create(req);
    res.jsonResponse(user, 201);
  });

  update = asyncErrorHandler(async (req, res, next) => {
    const user = await this.service.update(req);
    res.jsonResponse(user, 200);
  });

  partialUpdate = asyncErrorHandler(async (req, res, next) => {
    let user = await this.service.update(req);
    res.jsonResponse(user, 200);
  });

  destroy = asyncErrorHandler(async (req, res, next) => {
    await this.service.destroy(req);
    res.jsonResponse(null, 204);
  });
}

module.exports = BaseController;
