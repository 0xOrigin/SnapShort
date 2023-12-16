const express = require('express');
const { UrlController } = require('./../../controllers');
const router = express.Router();

const controller = new UrlController();

router
  .get('/', controller.list)
  .get('/:urlCode', controller.retrieve)
  .get('/:urlCode/details', controller.details)
  .post('/', controller.create)
  .delete('/:urlCode', controller.destroy);

module.exports = router;
