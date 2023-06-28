import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

//
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
// console.log(app.get('env'))

//middlewares
app.use('/api/v1/users', UserRoutes);

//testing api's
app.get('/', async () => {
  throw new Error('Testing Error logger');
});

//global error handler
app.use(globalErrorHandler);

export default app;
