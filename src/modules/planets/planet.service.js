const createBaseService = require('../../utils/baseService');
const planetRepository = require('./planet.repository');

module.exports = createBaseService(planetRepository, 'Planet', ['name', 'createdAt', 'population'], ['climate', 'terrain'], ['name', 'description']);
