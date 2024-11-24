const { Router } = require('express');
const Email = require('../Middleware/email');
const route = Router()

route.get('/', (req, res) => {
    res.send('Hello World!')
  })

route.post('/api/mail', Email)

module.exports = route;