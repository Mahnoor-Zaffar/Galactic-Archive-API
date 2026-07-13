const express = require('express');
const createBaseController = require('./baseController');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const createBaseRoutes = (service) => {
  const controller = createBaseController(service);
  const router = express.Router();

  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.post('/', authenticate, authorize('ADMIN'), controller.create);
  router.put('/:id', authenticate, authorize('ADMIN'), controller.update);
  router.delete('/:id', authenticate, authorize('ADMIN'), controller.remove);

  return router;
};

module.exports = createBaseRoutes;
