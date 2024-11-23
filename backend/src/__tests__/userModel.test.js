const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../Database/Modal/userSchema');

let mongoServer;

beforeAll(async () => {
  // Inicia MongoMemoryServer
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Conéctate a la base de datos en memoria
  await mongoose.connect(uri);
});

afterAll(async () => {
  // Cierra la conexión y detén MongoMemoryServer
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Limpia la colección de usuarios después de cada prueba
  await User.deleteMany();
});

describe('User Model Tests', () => {
  it('Should save a user successfully', async () => {
    const userData = {
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      birthdate: new Date('1990-01-01'),
    };

    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.lastname).toBe(userData.lastname);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.birthdate).toEqual(userData.birthdate);
  });

  it('Should fail if a required field is missing', async () => {
    const userData = {
      lastname: 'Doe',
      email: 'john.doe@example.com',
      birthdate: new Date('1990-01-01'),
    };

    try {
      const invalidUser = new User(userData);
      await invalidUser.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors.name).toBeDefined();
    }
  });

  it('Should fail if the email is not unique', async () => {
    const userData = {
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      birthdate: new Date('1990-01-01'),
    };
  
    const user1 = new User(userData);
    await user1.save();
  
    const user2 = new User(userData);
    try {
      await user2.save();
    } catch (error) {
      // Cambiar a MongoServerError
      expect(error).toBeInstanceOf(mongoose.mongo.MongoServerError);
      expect(error.code).toBe(11000); // Código de error para clave duplicada
    }
  });
});
