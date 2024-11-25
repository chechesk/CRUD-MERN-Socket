const userSchema = require("../Database/Modal/userSchema");
const mongoose = require("mongoose");

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; // El cuerpo contiene los pares de campos y valores

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format." });
    }

    // Validar que se haya proporcionado al menos un campo a actualizar
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No fields to update." });
    }

    // Validar que los campos sean válidos
    const allowedFields = ["name", "lastname", "email", "password", "birthdate"];
    const invalidFields = Object.keys(updates).filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
        return res.status(400).json({ message: `Invalid fields: ${invalidFields.join(", ")}` });
    }

    // Si el campo es "password", encriptarlo antes de guardarlo
    if (updates.password) {
        try {
            const salt = await bcrypt.genSalt(10); // Generamos el salt
            updates.password = await bcrypt.hash(updates.password, salt); // Encriptamos la contraseña
        } catch (err) {
            return res.status(500).json({ message: "Error encrypting password." });
        }
    }

    try {
        // Actualizamos los campos proporcionados
        const user = await userSchema.findByIdAndUpdate(id, updates, { new: true });

        // Si no se encuentra el usuario
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Responder con el usuario actualizado
        res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user. Please try again later." });
    }
};

module.exports = updateUser;
