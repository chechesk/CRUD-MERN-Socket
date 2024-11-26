const { Router } = require('express');
const Email = require('../Middleware/email');
const userRouter = require('./userRouter');
const { loginUser } = require('../Middleware/login');
const route = Router()

route.use('/api/v1/users', userRouter)

route.get('/api/v1', (req, res) => {
    res.send('Backend for MERN ')
  })

route.post('/login', loginUser)

route.post('/api/mail', Email)

module.exports = route;