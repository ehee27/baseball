import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js'
// import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

connectDB()

const port = process.env.PORT || 3500
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// use my routes
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Server is HOT')
})

// error handling from errorMiddleware
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
