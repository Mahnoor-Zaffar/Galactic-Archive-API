const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { environment } = require('./config/environment');
const { errorConverter, errorHandler, notFoundHandler } = require('./middleware/error.middleware');
const { apiLimiter } = require('./middleware/rateLimiter.middleware');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan(environment.logLevel));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Galactic Archive API Docs',
}));

app.get('/', (req, res) => {
  res.json({
    name: 'Galactic Archive API',
    version: '1.0.0',
    docs: '/api-docs',
    endpoints: {
      health: '/api/v1/health',
      auth: '/api/v1/auth',
      characters: '/api/v1/characters',
      planets: '/api/v1/planets',
      species: '/api/v1/species',
      starships: '/api/v1/starships',
      factions: '/api/v1/factions',
      movies: '/api/v1/movies',
    },
  });
});

app.use('/api/', apiLimiter);

app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
