const prisma = require('../config/database');

const createBaseRepository = (modelName, allowedSortFields = ['name', 'createdAt'], allowedFilterFields = []) => {
  const model = prisma[modelName];
  if (!model) throw new Error(`Prisma model "${modelName}" not found`);

  const findAll = async ({ skip, limit, orderBy, filters, search, searchFields = ['name', 'description'], includes = {} }) => {
    const where = { ...filters };
    if (search) {
      where.OR = searchFields.map((field) => ({
        [field]: { contains: search, mode: 'insensitive' },
      }));
    }

    const [data, total] = await Promise.all([
      model.findMany({
        skip,
        take: limit,
        orderBy,
        where,
        include: includes,
      }),
      model.count({ where }),
    ]);

    return { data, total };
  };

  const findById = async (id, includes = {}) => {
    return model.findUnique({ where: { id }, include: includes });
  };

  const create = async (data) => {
    return model.create({ data });
  };

  const update = async (id, data) => {
    return model.update({ where: { id }, data });
  };

  const remove = async (id) => {
    await model.delete({ where: { id } });
  };

  return { findAll, findById, create, update, remove };
};

module.exports = createBaseRepository;
