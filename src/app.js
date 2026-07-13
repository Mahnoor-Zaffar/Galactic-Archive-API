const express = require('express');
const path = require('path');
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

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan(environment.logLevel));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Galactic Archive API Docs',
}));

const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));

app.use('/api/', apiLimiter);

app.use('/api/v1', routes);

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return notFoundHandler(req, res, () => {});
  }
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
