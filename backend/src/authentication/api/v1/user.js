const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { UserController } = require('../../controllers');
const router = express.Router();

controller = new UserController();

router.use(isAuthenticated);

router
  .get('/', controller.list)
  .get('/:userId', controller.retrieve)
  .post('/', controller.create)
  .put('/:userId', controller.update)
  .patch('/:userId', controller.partialUpdate)
  .delete('/:userId', controller.destroy);


module.exports = router;
