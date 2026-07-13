const characterRepository = require('./character.repository');
const ApiError = require('../../utils/ApiError');

const list = async (query) => {
  const { getPaginationParams, getSortParam, getFilterParams, getSearchParam } = require('../../utils/pagination');
  const { page, limit, skip } = getPaginationParams(query);
  const orderBy = getSortParam(query, ['name', 'createdAt', 'height', 'age']);
  const filters = getFilterParams(query, ['speciesId', 'planetId', 'factionId']);
  const search = getSearchParam(query);

  const { data, total } = await characterRepository.findAll({ skip, limit, orderBy, filters, search });

  const { buildPaginatedResponse } = require('../../utils/pagination');
  return buildPaginatedResponse(data, total, page, limit);
};

const getById = async (id) => {
  const character = await characterRepository.findById(id);
  if (!character) {
    throw new ApiError(404, 'Character not found.');
  }
  return character;
};

const create = async (data) => {
  return characterRepository.create(data);
};

const update = async (id, data) => {
  const existing = await characterRepository.findById(id);
  if (!existing) {
    throw new ApiError(404, 'Character not found.');
  }
  return characterRepository.update(id, data);
};

const remove = async (id) => {
  const existing = await characterRepository.findById(id);
  if (!existing) {
    throw new ApiError(404, 'Character not found.');
  }
  await characterRepository.remove(id);
};

module.exports = { list, getById, create, update, remove };
