const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')

const app = express()

connectDB()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended:false }))

app.use(errorHandler)

app.use('/api/goals/',require('./routes/goalRoutes'))
app.use('/api/users/',require('./routes/userRoutes'))
app.use('/api/admin/',require('./routes/adminRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))