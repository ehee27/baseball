import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  //
  // CREATE TOKEN with ID and secret
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '10s',
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
  console.log('This is the token_______', token)

  // CREATE REFRESH TOKEN with ID and SECRET
  // const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
  //   expiresIn: '1d',
  // })

  // // CREATE SECURE COOKIE WITH REFRESH TOKEN
  // res.cookie('jwt', refreshToken, {
  //   httpOnly: true,
  //   // secure: process.env.NODE_ENV !== 'development',
  //   secure: true,
  //   // sameSite: 'strict',
  //   sameSite: 'None',
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  // })
  // console.log('This is the token_______', token)
}

export default generateToken
