const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { UserController } = require('../../controllers');
const router = express.Router();

controller = new UserController();

router.post('/', controller.create); // No authentication required

router.use(isAuthenticated);

router
  .get('/', controller.list)
  .get('/:userId', controller.retrieve)
  .put('/:userId', controller.update)
  .patch('/:userId', controller.partialUpdate)
  .delete('/:userId', controller.destroy);


module.exports = router;
