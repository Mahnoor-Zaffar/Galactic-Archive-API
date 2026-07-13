const createBaseRoutes = require('../../utils/baseRoutes');
const factionService = require('./faction.service');

module.exports = createBaseRoutes(factionService);
