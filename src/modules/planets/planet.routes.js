const createBaseRoutes = require('../../utils/baseRoutes');
const planetService = require('./planet.service');

module.exports = createBaseRoutes(planetService);
