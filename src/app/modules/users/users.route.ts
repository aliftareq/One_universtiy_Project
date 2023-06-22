import express from 'express'
import usersController from './users.controller'

const router = express.Router()

//all-routers
router.post('/create-user', usersController.createUser)

export default router
