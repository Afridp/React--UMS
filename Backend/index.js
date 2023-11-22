const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const db = require('./Configrations/dbConfig') 
db.connect()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:'http://localhost:5000',
    methods:['GET','POST'],
    credentials:true
}))

const userRoutes = require('./Routes/userRoutes')
app.use('/',userRoutes)

const adminRoutes = require('./Routes/adminRoutes')
app.use('/admin',adminRoutes)

app.listen(3000,()=>console.log('server connected succesfully'))