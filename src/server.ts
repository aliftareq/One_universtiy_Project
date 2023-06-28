import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { errorLogger, infoLogger } from './shared/logger';
import { Server } from 'http';

//handling uncaught error
process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);

    infoLogger.info(`Database is connected successfully`);

    server = app.listen(config.port, () => {
      infoLogger.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('Failed to connect database', error);
  }

  //gracefully turning off the server.
  process.on('unhandledRejection', error => {
    console.log(
      'unhandled Rejection is detected, We are closing our Server...'
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

//handling signal terminatin.

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is recieved.');
  if (server) {
    server.close();
  }
});
