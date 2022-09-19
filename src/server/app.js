const express = require('express');
const cors = require('cors');
const {serve, setup} = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const {createPool} = require('./util/DBConnectionHandler');
const usersRouter = require('./routes/usersRouter.js');
const commentsRouter = require('./routes/commentsRouter.js');
const votesRouter = require('./routes/votesRouter.js');
const {
  usersBaseUrl, commentsBaseUrl, votesBaseUrl,
} = require('./constants/routeConstants');
const {initializeWebsocketServer} = require('./util/websocketServer.js');

const port = process.env.IS_TEST ? 3030 : process.env.NODE_DOCKER_PORT || 3000;

const app = express();

createPool();

app.use(cors());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ouija Board Enigma',
      version: '1.0.0',
    },

    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'My API Documentation',
      },
    ],
  },
  apis: ['./src/server/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', serve, setup(swaggerSpec));

app.use(usersBaseUrl, usersRouter);

app.use(commentsBaseUrl, commentsRouter);

app.use(votesBaseUrl, votesRouter);

const buildPath = path.resolve(__dirname, '../../dist');
app.use(express.static(buildPath));

const server = app.listen(port, () => {
  console.log(`
    Listening on port ${port}
    Server running at http://localhost:${port}
    Swagger Docs running at http://localhost:${port}/api-docs
  `);
});

initializeWebsocketServer(server);

module.exports = {
  app,
};
