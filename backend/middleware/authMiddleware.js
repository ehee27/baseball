// write function to protect specific routes - export and chain to controller on desired routes
// 3 steps
// 1. set flexible token variabale and pull from req.cookies.jwt
// 2. if token, decode token to get user object, specifically ID
// 3. now find the user by ID
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token
  // CHECK FOR COOKIE w the JWT
  token = req.cookies.jwt
  if (token) {
    // DECODE (verify method) IT TO CHECK FOR userId
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Invalid token')
    }
  } else {
    res.status(401)
    throw new Error('No token')
  }
})

export { protect }
