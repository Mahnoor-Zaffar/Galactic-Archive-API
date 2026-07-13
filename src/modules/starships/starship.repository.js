const createBaseRepository = require('../../utils/baseRepository');

module.exports = createBaseRepository('starship', ['name', 'createdAt', 'speed', 'crewCapacity'], ['model', 'manufacturer']);
