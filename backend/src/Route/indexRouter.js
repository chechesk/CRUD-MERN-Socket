const { Router } = require('express');
const Email = require('../Middleware/email');
const userRouter = require('./userRouter')
const route = Router()

route.use('/users', userRouter)

route.get('/', (req, res) => {
    res.send('Hello World!')
  })

route.post('/api/mail', Email)

module.exports = route;