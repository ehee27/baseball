import jwt from 'jsonwebtoken'

const generateRefreshToken = (res, userId) => {
  //
  // CREATE REFRESH TOKEN with ID and SECRET
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '1d',
  })

  // CREATE SECURE COOKIE WITH REFRESH TOKEN
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV !== 'development',
    secure: true,
    // sameSite: 'strict',
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  console.log('This is the token_______', token)
}

export default generateRefreshToken
