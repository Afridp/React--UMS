const express = require('express')
const adminRoute = express()

const adminController = require('../Controller/adminController')
const auth = require('../Middleware/adminAuth')

adminRoute.post("/login",adminController.adminLogin) 
adminRoute.get('/userList',auth.authenticateAdmin,adminController.userList)
adminRoute.post('/deleteUser',auth.authenticateAdmin,adminController.deleteUser)
adminRoute.get('/editUser/:id',auth.authenticateAdmin,adminController.editUserDetails)
adminRoute.post('/updateUser',auth.authenticateAdmin,adminController.updateUserDetails)
adminRoute.post('/addUserData',auth.authenticateAdmin,adminController.addUserData)

module.exports = adminRoute