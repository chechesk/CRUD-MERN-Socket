const createUser = require("./createUser");
const deleteUser = require("./deleteUser");
const getUser = require("./getUser");
const getUserById = require("./getUserById");
const updateUser = require("./updateUser");

module.exports = { 
    getUser,
    createUser,
    deleteUser,
    getUserById,
    updateUser
}