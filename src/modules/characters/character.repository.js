const prisma = require('../../config/database');

const characterIncludes = {
  species: { select: { id: true, name: true } },
  planet: { select: { id: true, name: true } },
  faction: { select: { id: true, name: true, alignment: true } },
  movies: {
    include: {
      movie: { select: { id: true, title: true, episode: true } },
    },
  },
};

const findAll = async ({ skip, limit, orderBy, filters, search }) => {
  const where = { ...filters };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.character.findMany({
      skip,
      take: limit,
      orderBy,
      where,
      include: characterIncludes,
    }),
    prisma.character.count({ where }),
  ]);

  const mapped = data.map((c) => ({
    ...c,
    movies: c.movies.map((cm) => cm.movie),
  }));

  return { data: mapped, total };
};

const findById = async (id) => {
  const character = await prisma.character.findUnique({
    where: { id },
    include: characterIncludes,
  });
  if (!character) return null;
  return {
    ...character,
    movies: character.movies.map((cm) => cm.movie),
  };
};

const create = async (data) => {
  const { movieIds, ...rest } = data;
  const character = await prisma.character.create({
    data: {
      ...rest,
      ...(movieIds && {
        movies: {
          create: movieIds.map((movieId) => ({ movieId })),
        },
      }),
    },
    include: characterIncludes,
  });
  return { ...character, movies: character.movies.map((cm) => cm.movie) };
};

const update = async (id, data) => {
  const { movieIds, ...rest } = data;

  if (movieIds) {
    await prisma.characterMovie.deleteMany({ where: { characterId: id } });
    await prisma.characterMovie.createMany({
      data: movieIds.map((movieId) => ({ characterId: id, movieId })),
    });
  }

  const character = await prisma.character.update({
    where: { id },
    data: rest,
    include: characterIncludes,
  });
  return { ...character, movies: character.movies.map((cm) => cm.movie) };
};

const remove = async (id) => {
  await prisma.character.delete({ where: { id } });
};

module.exports = { findAll, findById, create, update, remove };
