const { default: mongoose } = require("mongoose");
const userSchema = require("../Database/Modal/userSchema");



const deleteUser = async (req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format." });
    }
    try {
        const result  = await userSchema.deleteOne({ _id: id })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found. No user deleted." });
        }
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error delete user id. Please try again later." });
    }
}
module.exports = deleteUser