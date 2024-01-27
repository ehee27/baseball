import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

// GET ALL USERS -------------------------------------
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean()
  if (!users?.length) {
    return res.json({ message: 'No users found' })
  }
  res.json(users)
})

//
// REGISTER NEW USER ---------------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, roles } = req.body
  //---------------
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  //
  const user = await User.create({ name, email, password, roles })
  if (user) {
    //
    // GENERATE TOKEN -------------------------
    generateToken(res, user._id)
    res.status(201).json({ _id: user._id, name: user.name, email: user.email })
    //
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//
// AUTHORIZE ---------------------------------------
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  //
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    //
    // GENERATE TOKEN -------------------------
    generateToken(res, user._id)
    res.status(201).json({ _id: user._id, name: user.name, email: user.email })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
  res.status(200).json({ message: 'Auth User' })
})

//
// LOGOUT -------------------------------------
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'User logged outz' })
  console.log('Cookie cleared')
})

//
// GET PROFILE ------------------------------------
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }
  res.status(200).json(user)
})

//
// UPDATE PROFILE --------------------------------
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  //
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    //
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    })
    //
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  res.status(200).json({ message: 'Profile updated' })
})

export {
  getAllUsers,
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
}