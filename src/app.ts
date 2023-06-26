import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
import ApiError from './errors/ApiErrors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

//
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
// console.log(app.get('env'))

//middlewares
app.use('/api/v1/users', usersRouter)

//testing api's
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new ApiError(4000, 'There is a new custom error')
    // res.send('Working Successfully')
    // next('ore baba error khaichi')
  } catch (error) {
    next(error)
  }
})

//global error handler
app.use(globalErrorHandler)

export default app
