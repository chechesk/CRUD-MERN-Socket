const userSchema = require('../Database/Modal/userSchema');

const confirCode = async (req, res) => {
    const { email, code } = req.body;

    try {
        // Buscar el usuario por correo
        const user = await userSchema.findOne({ email });

        if (!user) return res.status(404).json({ message: "Usuario no encontrado." });

        // Verificar si el código de confirmación es correcto
        if (user.confirmationCode !== code) {
            return res.status(400).json({ message: "Código de confirmación incorrecto." });
        }

        // Verificar si el código ya fue usado
        if (user.isVerified) {
            return res.status(400).json({ message: "La cuenta ya ha sido confirmada." });
        }

        // Marcar al usuario como verificado
        user.isVerified = true;
        user.confirmationCode = null; // Limpiar el código de confirmación
        await user.save();

        res.status(200).json({ message: "Cuenta confirmada exitosamente." });
    } catch (error) {
        console.error("Error en la confirmación:", error);
        res.status(500).json({ message: "Error en el servidor." });
    }
};

module.exports = confirCode;