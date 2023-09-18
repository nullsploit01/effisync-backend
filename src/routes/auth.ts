import express from 'express'
import { body } from 'express-validator'

import { authController } from '../controllers/auth.controller'
import { requestValidator } from '../middlewares/request-validator.middleware'

const router = express.Router()

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Please provide a password')
  ],
  requestValidator,
  authController.login
)

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Please provide a Name'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Please provide a password')
  ],
  requestValidator,
  authController.register
)

export { router as authRouter }
