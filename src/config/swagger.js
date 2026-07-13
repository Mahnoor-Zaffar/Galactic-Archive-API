const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Galactic Archive API',
      version: '1.0.0',
      description: 'A public REST API for querying fictional universe data — characters, planets, species, starships, factions, and events.',
      contact: {
        name: 'Galactic Archive',
      },
    },
    servers: [
      { url: '/api/v1', description: 'API v1' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/modules/**/*.routes.js', './src/modules/**/*.controller.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
