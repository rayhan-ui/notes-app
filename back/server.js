const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())

const authRoutes = require('./routes/authRoutes')
const noteRoutes = require('./routes/noteRoutes')

app.use('/api/auth', authRoutes)
app.use('/api/notes', noteRoutes)

const mongo = process.env.MONGO_URI
const port = process.env.PORT

app.get('/', (req, res)=>{
    res.json('this is server page')
})


mongoose.connect(mongo)
.then(()=>console.log('mongo connected'))
.catch((err)=>{console.log(err.message)})

app.listen(port,()=>{
    console.log('server running')
})