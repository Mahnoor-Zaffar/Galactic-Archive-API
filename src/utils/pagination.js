const getPaginationParams = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const getSortParam = (query, allowedFields = ['createdAt', 'name']) => {
  const sortField = allowedFields.includes(query.sort) ? query.sort : 'createdAt';
  const sortOrder = query.order === 'asc' ? 'asc' : 'desc';
  return { [sortField]: sortOrder };
};

const getFilterParams = (query, allowedFilters = []) => {
  const filters = {};
  allowedFilters.forEach((field) => {
    if (query[field] !== undefined) {
      filters[field] = query[field];
    }
  });
  return filters;
};

const getSearchParam = (query) => query.search || null;

const buildPaginatedResponse = (data, total, page, limit) => ({
  data,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  },
});

module.exports = {
  getPaginationParams,
  getSortParam,
  getFilterParams,
  getSearchParam,
  buildPaginatedResponse,
};
