const path = require('path');
const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  partialUpdateUser,
  destroyUser,
} = require('./../../controllers');


router
  .get('/', getUsers)
  .get('/:userId', getUser)
  .post('/', createUser)
  .put('/:userId', updateUser)
  .patch('/:userId', partialUpdateUser)
  .delete('/:userId', destroyUser);


module.exports = router;
