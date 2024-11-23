const mongoose = require('mongoose');
const server = require('./index');
const { port } = require('./src/Config/env');
const connectToDb = require('./src/Database/db');

(async () => {
  try {
    await connectToDb();
    console.log('Database connection successful');

       if (!port) {
      throw new Error('PORT is not defined in the environment variables');
    }

      server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error('Error initializing application:', err);
    process.exit(1); 
  }
})();