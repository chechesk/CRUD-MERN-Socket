const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Configuración básica para Swagger
const swaggerDefinition = {
  openapi: '3.0.0', // Versión de OpenAPI
  info: {
    title: 'API Documentation', // Título
    version: '1.0.0', // Versión de la API
    description: 'Documentación de la API del Backend para MERN',
    contact: {
      name: "Jose Romero"
    }
  },
  servers: [
    {
      url: 'http://localhost:3001/api/v1', // Cambia al host de tu servidor
      description: 'Servidor de desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['src/Route/userRouter.js'],
};

const swaggerSpec = swaggerJSDoc(options);
console.log(JSON.stringify(swaggerSpec, null, 2));
module.exports = { swaggerUi, swaggerSpec };
