const path = require('path');
const express = require('express');
const router = express.Router();
const {
  getUrls,
  getUrl,
  getUrlDetails,
  createUrl,
  destroyUrl,
} = require('./../../controllers');

router
  .get('/', getUrls)
  .get('/:urlCode', getUrl)
  .get('/:urlCode/details', getUrlDetails)
  .post('/', createUrl)
  .delete('/:urlCode', destroyUrl);

module.exports = router;
