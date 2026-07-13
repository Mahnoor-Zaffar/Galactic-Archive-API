const createBaseService = require('../../utils/baseService');
const factionRepository = require('./faction.repository');

module.exports = createBaseService(factionRepository, 'Faction', ['name', 'createdAt'], ['alignment'], ['name', 'description']);
