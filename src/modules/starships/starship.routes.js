const createBaseRoutes = require('../../utils/baseRoutes');
const starshipService = require('./starship.service');

module.exports = createBaseRoutes(starshipService);
