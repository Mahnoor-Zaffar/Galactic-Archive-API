const createBaseService = require('../../utils/baseService');
const speciesRepository = require('./species.repository');

module.exports = createBaseService(speciesRepository, 'Species', ['name', 'createdAt', 'lifespan'], ['language'], ['name', 'description']);
