const userSchema = require('../Database/Modal/userSchema');

const getUser = async (req,res) => {
    try {
        const { name, email } = req.query;
        const query = {};

        if (name) query.name = new RegExp(name, 'i'); // Búsqueda insensible a mayúsculas
        if (email) query.email = email;

        const users = await userSchema.find(query);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users. Please try again later." });
    }
};

module.exports = getUser;
