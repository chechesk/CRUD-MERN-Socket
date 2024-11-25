const { Router } = require('express');
const { getUser, createUser, deleteUser, getUserById, updateUser } = require('../Constroller');



const route = Router()


route.get('/', getUser);

route.post('/', createUser);

route.get('/:id', getUserById)

route.delete('/:id', deleteUser)

route.put('/:id', updateUser)

module.exports = route;