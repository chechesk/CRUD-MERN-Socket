const { MAIL_USER } = require('../Config/env');
const userSchema = require('../Database/Modal/userSchema');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../Config/email');

const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password, birthdate } = req.body;

        // Validar datos básicos
        if (!name || !lastname || !email || !password || !birthdate) {
            return res.status(400).json({ message: "Todos los campos son requeridos." });
        }

        // Verificar que el correo no esté registrado
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "El correo electrónico ya está en uso." });
        }

        // Cifrar la contraseña
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Generar el código de confirmación
        const confirmationCode = crypto.randomBytes(4).toString("hex");
        console.log(confirmationCode);
        
        // Crear un nuevo usuario
        const newUser = new userSchema({
            name,
            lastname,
            email,
            password,
            birthdate,
            confirmationCode,
            isVerified: false, 
        });

        const savedUser = await newUser.save();

        // Excluir la contraseña en la respuesta
        const { password: _, ...userWithoutPassword } = savedUser.toObject();

        // Enviar correo con el código de confirmación
        await transporter.sendMail({
            from: MAIL_USER,
            to: email,
            subject: "Código de confirmación",
            text: `Tu código de confirmación es: ${confirmationCode}`,
        });

        // Responder con éxito
        res.status(201).json({ message: "Usuario creado exitosamente. Revisa tu correo para confirmar.", user: userWithoutPassword });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

module.exports = createUser;
