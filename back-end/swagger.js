const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API de Streaming',
      version: '1.0.0',
      description: 'Documentação da API de Streaming usando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL base da sua API
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/docs/*.js'], // agora aponta para os arquivos de doc
};

const specs = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  specs,
};
