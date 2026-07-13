const createBaseRepository = require('../../utils/baseRepository');

module.exports = createBaseRepository('faction', ['name', 'createdAt'], ['alignment']);
