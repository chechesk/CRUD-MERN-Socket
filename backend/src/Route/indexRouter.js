const { Router } = require('express');
const Email = require('../Middleware/email');
const loginRouter = require('./loginRouter');
const userRouter = require('./userRouter');
const { Authenticate } = require('../Middleware/autenticate');

const route = Router()

route.use('/users', Authenticate, userRouter)

route.use('/auth', loginRouter)

route.get('/', (req, res) => {
    res.send('Backend for MERN ')
  })



module.exports = route;