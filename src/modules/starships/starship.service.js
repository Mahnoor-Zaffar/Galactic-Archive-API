const createBaseService = require('../../utils/baseService');
const starshipRepository = require('./starship.repository');

module.exports = createBaseService(starshipRepository, 'Starship', ['name', 'createdAt', 'speed', 'crewCapacity'], ['model', 'manufacturer'], ['name', 'description', 'model']);
