const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../Database/Modal/userSchema');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Code Confirmation', () => {
    it('should save confirmation code and verify user', async () => {
        const confirmationCode = 'abcd1234'; // Definir el código de confirmación
        const userData = {
            name: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            birthdate: new Date('1990-01-01'),
            confirmationCode,
            isVerified: false, // El usuario no está verificado inicialmente
        };

        // Crear un usuario en la base de datos
        const user = new User(userData);
        await user.save();

        // Simular la actualización de confirmación de código
        user.confirmationCode = 'xyz9876'; // Cambiar el código
        user.isVerified = true;

        // Guardar los cambios
        const updatedUser = await user.save();

        // Verificar si el código y la verificación se actualizaron correctamente
        expect(updatedUser.confirmationCode).toBe('xyz9876');
        expect(updatedUser.isVerified).toBe(true);
        expect(updatedUser.birthdate).toEqual(userData.birthdate);
    });
});
