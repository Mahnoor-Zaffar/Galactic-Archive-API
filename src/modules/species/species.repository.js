const createBaseRepository = require('../../utils/baseRepository');

module.exports = createBaseRepository('species', ['name', 'createdAt', 'lifespan'], ['language']);
