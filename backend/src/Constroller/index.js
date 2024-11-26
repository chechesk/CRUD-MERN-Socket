const confirCode = require("./confirCode");
const createUser = require("./createUser");
const deleteUser = require("./deleteUser");
const getUser = require("./getUser");
const getUserById = require("./getUserById");
const loginUser  = require("./login");
const logoutUser = require("./logout");
const updateUser = require("./updateUser");

module.exports = { 
    getUser,
    createUser,
    deleteUser,
    getUserById,
    updateUser,
    confirCode,
    loginUser,
    logoutUser
}