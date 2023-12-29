const express = require('express');
const { isAuthenticated } = require('../../../authentication/middlewares');
const { UrlController } = require('../../controllers');
const router = express.Router();

const controller = new UrlController();

router
  .get('/', isAuthenticated, controller.list)
  .get('/:urlCode', controller.retrieve)
  .get('/:urlCode/details', controller.details)
  .post('/', controller.create)
  .delete('/:urlCode', isAuthenticated, controller.destroy);

module.exports = router;
