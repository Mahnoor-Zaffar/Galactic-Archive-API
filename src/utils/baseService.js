const ApiError = require('./ApiError');
const { getPaginationParams, getSortParam, getFilterParams, getSearchParam, buildPaginatedResponse } = require('./pagination');

const createBaseService = (repository, resourceName, allowedSortFields, allowedFilterFields, searchFields) => {
  const list = async (query) => {
    const { page, limit, skip } = getPaginationParams(query);
    const orderBy = getSortParam(query, allowedSortFields);
    const filters = getFilterParams(query, allowedFilterFields);
    const search = getSearchParam(query);

    const { data, total } = await repository.findAll({
      skip, limit, orderBy, filters, search, searchFields,
    });

    return buildPaginatedResponse(data, total, page, limit);
  };

  const getById = async (id) => {
    const record = await repository.findById(id);
    if (!record) {
      throw new ApiError(404, `${resourceName} not found.`);
    }
    return record;
  };

  const create = async (data) => {
    return repository.create(data);
  };

  const update = async (id, data) => {
    const existing = await repository.findById(id);
    if (!existing) {
      throw new ApiError(404, `${resourceName} not found.`);
    }
    return repository.update(id, data);
  };

  const remove = async (id) => {
    const existing = await repository.findById(id);
    if (!existing) {
      throw new ApiError(404, `${resourceName} not found.`);
    }
    await repository.remove(id);
  };

  return { list, getById, create, update, remove };
};

module.exports = createBaseService;
