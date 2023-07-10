import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
// import { generateFacultyId } from './app/modules/user/user.utils';

const app: Application = express();

//
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
// console.log(app.get('env'))

//middlewares
app.use('/api/v1', routes);

//testing api's
// app.get('/', async () => {
//   throw new Error('Testing Error logger');
// });

//global error handler
app.use(globalErrorHandler);

//handle not found error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: {
      path: req.originalUrl,
      message: 'API Not Found',
    },
  });
  next();
});

//testing generated function

// const testId = async () => {
//   const testId = await generateFacultyId();
//   console.log(testId);
// };

// testId();

export default app;
