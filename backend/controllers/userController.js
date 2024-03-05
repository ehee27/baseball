import asyncHandler from 'express-async-handler'
import User from '../models/User.js'

// GET ALL USERS -------------------------------------
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean()
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' })
  }
  res.json(users)
})

//
// REGISTER NEW USER ---------------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, username, profilePic, password, active, roles } =
    req.body
  //---------------
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  //
  const user = await User.create({
    name,
    email,
    username,
    password,
    active,
    roles,
    position: '',
    number: '',
    age: '',
    height: '',
    weight: '',
    bats: '',
    throws: '',
    hs: '',
    bio: '',
    profilePic: '',
    stats: [],
  })
  if (user) {
    //
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: profilePic,
    })
    //
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//
// GET PROFILE ------------------------------------
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    profilePic: req.user.profilePic,
    stats: req.user.stats,
  }
  res.status(200).json(user)
})

//
// UPDATE PROFILE --------------------------------
// either set NEW REQ DATA or EXISTING DATA
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id)
  //
  if (user) {
    user.name = req.body.name || user.name
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.active = req.body.active || user.active
    user.roles = req.body.roles || user.roles
    user.position = req.body.position || user.position
    user.number = req.body.number || user.number
    user.age = req.body.age || user.age
    user.height = req.body.height || user.height
    user.weight = req.body.weight || user.weight
    user.bats = req.body.bats || user.bats
    user.throws = req.body.throws || user.throws
    user.hs = req.body.hs || user.hs
    user.bio = req.body.bio || user.bio
    user.profilePic = req.body.profilePic || user.profilePic
    user.stats = req.body.stats || user.stats

    // if (req.body.password) {
    //   user.password = req.body.password
    // }
    const updatedUser = await user.save()
    //
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      // active: updatedUser.active,
      roles: updatedUser.roles,
      profilePic: updatedUser.profilePic,
      stats: updatedUser.stats,
    })
    //
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  res.status(200).json({ message: 'Profile updated' })
})

export { getAllUsers, registerUser, getUserProfile, updateUserProfile }
