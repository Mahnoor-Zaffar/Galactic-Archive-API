const createBaseRepository = require('../../utils/baseRepository');

module.exports = createBaseRepository('planet', ['name', 'createdAt', 'population'], ['climate', 'terrain']);
