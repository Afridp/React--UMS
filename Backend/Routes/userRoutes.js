const express = require('express')
const userRoute = express()
const {uploadOptions} = require('../Configrations/Multer')
const userController = require('../Controller/userController')
const auth = require('../Middleware/userAuth')

userRoute.post('/signup',userController.userRegistration)
userRoute.post('/login',userController.userLogin)
userRoute.post('/updateImage',auth.authenticateUser,uploadOptions.single('image'),userController.imageUpload)


module.exports = userRoute