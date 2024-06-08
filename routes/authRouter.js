const express = require('express')
const { signup, login } = require('../controllers/authController')
const authRouter = express.Router()

authRouter.route('/')
    .post(signup)

authRouter.route('/:email&:password')
    .get(login)

module.exports = authRouter