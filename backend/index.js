const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const indexRouter = require('./src/Route/indexRouter')
const bodyParser = require('body-parser')

const server = express()

server.use(express.json())
server.use(morgan('dev'))
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors(
    {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',  
    }
      ));

server.use('/', indexRouter)


module.exports = server;