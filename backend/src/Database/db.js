const mongoose = require('mongoose');
const { MONGODB_URI } = require('../Config/env');

async function connectToDb() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }

  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);

    const db = mongoose.connection;

    
    db.on('error', (err) => {
      console.error('Connection error:', err);
      process.exit(1); // Salir si hay un error crítico
    });

    // Evento de apertura de la conexión
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

module.exports = connectToDb;
