const createBaseRepository = require('../../utils/baseRepository');

module.exports = createBaseRepository('movie', ['title', 'createdAt', 'episode', 'releaseDate'], ['episode']);
