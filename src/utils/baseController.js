const catchAsync = require('./catchAsync');

const createBaseController = (service) => {
  const list = catchAsync(async (req, res) => {
    const result = await service.list(req.query);
    res.json({ status: 'success', ...result });
  });

  const getById = catchAsync(async (req, res) => {
    const record = await service.getById(req.params.id);
    res.json({ status: 'success', data: record });
  });

  const create = catchAsync(async (req, res) => {
    const record = await service.create(req.body);
    res.status(201).json({ status: 'success', data: record });
  });

  const update = catchAsync(async (req, res) => {
    const record = await service.update(req.params.id, req.body);
    res.json({ status: 'success', data: record });
  });

  const remove = catchAsync(async (req, res) => {
    await service.remove(req.params.id);
    res.status(204).send();
  });

  return { list, getById, create, update, remove };
};

module.exports = createBaseController;
