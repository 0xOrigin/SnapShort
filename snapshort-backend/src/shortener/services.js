const models = require('./models');
const { AppError } = require('./../snapshort-backend/errorHandlers');

class UrlService {
  constructor() {
    this.model = models.Url;
  }

  list = async (req) => {
    const urls = await this.model.findAll();
    return urls;
  };

  retrieveOne = async (req) => {
    const url = await this.model.findOne({
      where: {
        urlCode: req.params.urlCode,
      },
    });
    return url;
  };

  retrieve = async (req) => {
    const url = await this.retrieveOne(req);
    await url.increment('clicks');
    return url;
  };

  create = async (req) => {
    const url = await this.model.create(
      { url: req.body.url },
      { returning: true },
    );
    if (url[0] === 0) throw new AppError('Validation error', 400);
    return url;
  };

  destroy = async (req) => {
    const isDeleted = await this.model.destroy({
      where: {
        urlCode: req.params.urlCode,
      },
    });
    if (!isDeleted) throw new AppError('Not found', 404);
    return null;
  };
}

module.exports = {
  UrlService,
};
