import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'
// import generateRefreshToken from '../utils/generateRefreshToken.js'
import jwt from 'jsonwebtoken'

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
  const { name, email, username, password, active, roles } = req.body
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
  })
  if (user) {
    //
    // GENERATE TOKEN -------------------------
    // generateToken(res, user._id)
    res.status(201).json({ _id: user._id, name: user.name, email: user.email })
    //
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// AUTHORIZE ---------------------------------------
// const authUser = asyncHandler(async (req, res) => {
//   // const { email, password } = req.body
//   const { username, password } = req.body
//   //
//   const user = await User.findOne({ username }).exec()
//   if (user && (await user.matchPassword(password))) {
//     //
//     // GENERATE TOKEN -------------------------
//     generateToken(res, user._id)
//     res.status(201).json({ _id: user._id, name: user.name, email: user.email })
//   } else {
//     res.status(401)
//     throw new Error('Invalid email or password')
//   }
//   res.status(200).json({ message: 'Auth User' })
// })

// REFRESH -----------------------------------------
// const refreshAuth = asyncHandler(async (req, res) => {
//   // WE EXPECT A COOKIE IN THE REQ
//   const cookies = req.cookies
//   // IF WE DON'T HAVE IT
//   if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
//   // OTHERWISE SET THE refreshToken to the jwt
//   const refreshToken = cookies.jwt
//   //
//   jwt.verify(
//     refreshToken,
//     process.env.JWT_REFRESH_SECRET,
//     asyncHandler(async (err, decoded) => {
//       if (err) return res.status(403).json({ message: 'Forbidden' })
//       //
//       const foundUser = await User.findOne({ username: decoded.username })
//       //
//       if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })
//       //
//       const accessToken = jwy.sign(
//         {
//           UserInfo: {
//             username: foundUser.username,
//             roles: foundUser.roles,
//           },
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: '10s' }
//       )

//       res.json(accessToken)
//     })
//   )
// })

//
// LOGOUT -------------------------------------
// const logoutUser = asyncHandler(async (req, res) => {
//   res.cookie('jwt', '', {
//     httpOnly: true,
//     expires: new Date(0),
//   })
//   res.status(200).json({ message: 'User logged outz' })
//   console.log('Cookie cleared')
// })

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
  const user = await User.findById(req.body.id)
  //
  if (user) {
    user.name = req.body.name || user.name
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.active = req.body.active || user.active
    user.roles = req.body.roles || user.roles

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
  // authUser,
  // refreshAuth,
  registerUser,
  // logoutUser,
  getUserProfile,
  updateUserProfile,
}
