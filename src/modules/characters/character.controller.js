const catchAsync = require('../../utils/catchAsync');
const characterService = require('./character.service');

const list = catchAsync(async (req, res) => {
  const result = await characterService.list(req.query);
  res.json({ status: 'success', ...result });
});

const getById = catchAsync(async (req, res) => {
  const character = await characterService.getById(req.params.id);
  res.json({ status: 'success', data: character });
});

const create = catchAsync(async (req, res) => {
  const character = await characterService.create(req.body);
  res.status(201).json({ status: 'success', data: character });
});

const update = catchAsync(async (req, res) => {
  const character = await characterService.update(req.params.id, req.body);
  res.json({ status: 'success', data: character });
});

const remove = catchAsync(async (req, res) => {
  await characterService.remove(req.params.id);
  res.status(204).send();
});

module.exports = { list, getById, create, update, remove };
