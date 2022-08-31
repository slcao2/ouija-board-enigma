import express from 'express';
import {serve, setup} from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import usersRouter from './routes/usersRouter.js';
import commentsRouter from './routes/commentsRouter.js';
import votesRouter from './routes/votesRouter.js';

const port = 3000;

const app = express();

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
  apis: ['./packages/server/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', serve, setup(swaggerSpec));

app.use('/users', usersRouter);

app.use('/comments', commentsRouter);

app.use('/votes', votesRouter);

app.listen(port, () => {
  console.log(`
    Listening on port ${port}
    Server running at http://localhost:${port}
    Swagger Docs running at http://localhost:${port}/api-docs
  `);
});
