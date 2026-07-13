const app = require('./app');
const { environment } = require('./config/environment');
const prisma = require('./config/database');

const start = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to PostgreSQL');

    app.listen(environment.port, () => {
      console.log(`Galactic Archive API running on port ${environment.port}`);
      console.log(`Environment: ${environment.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Disconnected from database');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

start();

module.exports = app;
