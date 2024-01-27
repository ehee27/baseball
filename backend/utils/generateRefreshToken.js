import jwt from 'jsonwebtoken'

const generateRefreshToken = (res, userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '1d',
  })

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
  console.log('This is the refresh token______', refreshToken)
}

export default generateRefreshToken
