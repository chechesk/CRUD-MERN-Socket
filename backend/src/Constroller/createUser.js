const userSchema = require('../Database/Modal/userSchema');

const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password, birthdate } = req.body;

        // Validar datos básicos
        if (!name || !lastname || !email || !password || !birthdate) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Verificar que el correo no esté registrado
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already in use." });
        }

        // Crear un nuevo usuario
        const newUser = new userSchema({ name, lastname, email, password, birthdate });
        const savedUser = await newUser.save();

        // Respuesta exitosa (omitiendo la contraseña en la respuesta)
        const { password: _, ...userWithoutPassword } = savedUser.toObject();
        res.status(201).json({ message: "User created successfully.", user: userWithoutPassword });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

module.exports = createUser;
