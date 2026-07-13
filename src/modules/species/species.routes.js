const createBaseRoutes = require('../../utils/baseRoutes');
const speciesService = require('./species.service');

module.exports = createBaseRoutes(speciesService);
