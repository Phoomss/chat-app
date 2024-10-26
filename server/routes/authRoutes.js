const express = require('express')
const authController =  require('../controllers/authController')
const authRouter = express.Router()

authRouter.post('/register',authController.register)
authRouter.post('/email',authController.checkEmail)
authRouter.post('/password',authController.checkPassword)
// logout
authRouter.get('/logout',authController.logout)

module.exports = authRouter