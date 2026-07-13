const express = require('express');
const { list, getById, create, update, remove } = require('./character.controller');
const validate = require('../../middleware/validate.middleware');
const { createCharacterSchema, updateCharacterSchema } = require('./character.validation');
const { authenticate, authorize } = require('../../middleware/auth.middleware');

const router = express.Router();

router.get('/', list);
router.get('/:id', getById);
router.post('/', authenticate, authorize('ADMIN'), validate(createCharacterSchema), create);
router.put('/:id', authenticate, authorize('ADMIN'), validate(updateCharacterSchema), update);
router.delete('/:id', authenticate, authorize('ADMIN'), remove);

module.exports = router;
