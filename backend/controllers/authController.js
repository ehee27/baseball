import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

// LOGIN -------------------------------------------
const login = asyncHandler(async (req, res) => {
  // DESTRUCT, FIND, MATCH ----------------
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  const foundUser = await User.findOne({ username }).exec()
  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const match = await bcrypt.compare(password, foundUser.password)
  if (!match) return res.status(401).json({ message: 'Unauthorized' })

  // BOTH tokens are created together, when ACCESS expires, REFRESH is requested
  // GENERATE THE TOKEN --------------
  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
        name: foundUser.name,
        username: foundUser.username,
        roles: foundUser.roles,
        active: foundUser.active,
        position: foundUser.position,
        bio: foundUser.bio,
        profilePic: foundUser.profilePic,
        stats: foundUser.stats,
        age: foundUser.age,
        height: foundUser.height,
        weight: foundUser.weight,
        bats: foundUser.bats,
        throws: foundUser.throws,
        hs: foundUser.hs,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )

  // GENERATE REFRESH TOKEN --------------
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )

  // SECURE COOKIE WITH TOKEN -------------
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: 'None', //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  })

  // Send accessToken containing username and roles
  res.json({ accessToken })
})

// REFRESH -------------------------------------------------
// looks for a 'COOKIE' object w the JWT and then VERIFIES
const refresh = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
  //

  // IF cookies has 'jwt'... that's the token and we need to decode
  const refreshToken = cookies.jwt

  // VERIFY 'decodes' the token to provide the user data
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })

      // use decoded into to find a user
      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec()

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

      // IF USER - WE CREATE ('sign') A REFRESH TOKEN ---------
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser._id,
            name: foundUser.name,
            username: foundUser.username,
            roles: foundUser.roles,
            active: foundUser.active,
            position: foundUser.position,
            bio: foundUser.bio,
            profilePic: foundUser.profilePic,
            stats: foundUser.stats,
            age: foundUser.age,
            height: foundUser.height,
            weight: foundUser.weight,
            bats: foundUser.bats,
            throws: foundUser.throws,
            hs: foundUser.hs,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      )

      res.json({ accessToken })
    })
  )
}

// REFRESH -------------------------------------------------
const logout = (req, res) => {
  // looks for a 'COOKIES' object in the req
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content

  // IF COOKIE has 'jwt' - CLEAR THAT SHIT
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie clearrrrrddddd' })
}

export { login, refresh, logout }
