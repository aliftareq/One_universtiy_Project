import mongoose from 'mongoose'
import config from './config'
import app from './app'
import { errorLogger, infoLogger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)

    infoLogger.info(`Database is connected successfully`)

    app.listen(config.port, () => {
      infoLogger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }
}

bootstrap()
