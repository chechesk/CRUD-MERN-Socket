const userSchema = require("../Database/Modal/userSchema");


const getUserById = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await userSchema.findById(id)
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).sendjson({ message: "Error search user by id. Please try again later." })
    }


}
module.exports = getUserById