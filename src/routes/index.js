const express = require('express');
const healthRoutes = require('../modules/health/health.routes');
const authRoutes = require('../modules/auth/auth.routes');
const characterRoutes = require('../modules/characters/character.routes');
const planetRoutes = require('../modules/planets/planet.routes');
const speciesRoutes = require('../modules/species/species.routes');
const starshipRoutes = require('../modules/starships/starship.routes');
const factionRoutes = require('../modules/factions/faction.routes');
const movieRoutes = require('../modules/movies/movie.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/characters', characterRoutes);
router.use('/planets', planetRoutes);
router.use('/species', speciesRoutes);
router.use('/starships', starshipRoutes);
router.use('/factions', factionRoutes);
router.use('/movies', movieRoutes);

module.exports = router;
