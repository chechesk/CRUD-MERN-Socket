const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../Database/Modal/userSchema');
const bcrypt = require('bcrypt')

let mongoServer;

beforeAll(async () => {
  
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  
  await mongoose.connect(uri);
});

afterAll(async () => {
  
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  
  await User.deleteMany();
});

describe('User Model Tests', () => {
  it('Should save a user successfully', async () => {
    const userData = {
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: '123',
      birthdate: new Date('1990-01-01'),
    };

    const savedUser = await User.create(userData);

    // Validar los datos del usuario
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.lastname).toBe(userData.lastname);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.birthdate).toEqual(userData.birthdate);

    // Validar que la contraseña fue encriptada
    expect(savedUser.password).not.toBe(userData.password);
    expect(savedUser.password).toMatch(/^\$2b\$10\$/);

    // Verificar que la contraseña original coincide con la encriptada
    const isPasswordValid = await bcrypt.compare(userData.password, savedUser.password);
    expect(isPasswordValid).toBe(true);
  });

  it('Should fail if a required field is missing', async () => {
    const userData = {
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password:  '1234',
      birthdate: new Date('1990-01-01')
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
      password: '1234',
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
