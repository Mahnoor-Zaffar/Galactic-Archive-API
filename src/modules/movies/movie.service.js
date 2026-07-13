const createBaseService = require('../../utils/baseService');
const movieRepository = require('./movie.repository');

module.exports = createBaseService(movieRepository, 'Movie', ['title', 'createdAt', 'episode', 'releaseDate'], ['episode'], ['title', 'description']);
