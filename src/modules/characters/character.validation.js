const { z } = require('zod');

const createCharacterSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(255),
    height: z.number().positive().optional().nullable(),
    age: z.number().int().positive().optional().nullable(),
    gender: z.string().max(50).optional().nullable(),
    speciesId: z.string().uuid().optional().nullable(),
    planetId: z.string().uuid().optional().nullable(),
    factionId: z.string().uuid().optional().nullable(),
    description: z.string().optional().nullable(),
    movieIds: z.array(z.string().uuid()).optional(),
  }),
});

const updateCharacterSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    height: z.number().positive().optional().nullable(),
    age: z.number().int().positive().optional().nullable(),
    gender: z.string().max(50).optional().nullable(),
    speciesId: z.string().uuid().optional().nullable(),
    planetId: z.string().uuid().optional().nullable(),
    factionId: z.string().uuid().optional().nullable(),
    description: z.string().optional().nullable(),
    movieIds: z.array(z.string().uuid()).optional(),
  }),
});

module.exports = { createCharacterSchema, updateCharacterSchema };
