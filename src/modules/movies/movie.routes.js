const createBaseRoutes = require('../../utils/baseRoutes');
const movieService = require('./movie.service');

module.exports = createBaseRoutes(movieService);
