const express = require('express')
const userController =  require('../controllers/userController')
const userRouter = express.Router()

userRouter.get('/user-details',userController.userDetails)

userRouter.put('/update-user',userController.updateUserDetail)

module.exports = userRouter