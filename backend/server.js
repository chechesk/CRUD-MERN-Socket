const server = require('./index');
const { PORT } = require('./src/Config/env');
const connectToDb = require('./src/Database/db');

(async () => {
  try {
    await connectToDb();
    console.log('Database connection successful');

       if (!PORT) {
      throw new Error('port is not defined in the environment variables');
    }

      server.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Documentación en http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Error initializing application:', err);
    process.exit(1); 
  }
})();