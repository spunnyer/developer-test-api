import express, { Application } from 'express';

import Routes from './routes';
import errorHandling from './shared/errorHandling';
import middleware from './shared/middleware';

const port = process.env.PORT || 8080;

// Create an Express instance
const app: Application = express();

// Add any middleware
middleware(app);

// Set up appropriate routes
Routes(app);

// Add any error handling
errorHandling(app);

// Listen on the appropriate port
app.listen(port, () => {
  app._router.stack
    .filter((r) => r.route)
    .forEach((r) => {
      console.info(
        `Mapped Route [${r.route.stack[0].method.toUpperCase()}] ${
          r.route.path
        }`
      );
    });

  console.log(`\nServer running on port ${port}`);
});
