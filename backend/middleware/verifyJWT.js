// we look at the HEADERS to see if there's an 'Authroization' header
// Then we look for the 'Bearer... ' which means there's an active token
import jwt from 'jsonwebtoken'

const verifyJWT = (req, res, next) => {
  // DEFINE THE HEADER VARIABLE
  const authHeader = req.headers.authorization || req.headers.Authorization

  // DOES IT CONTAIN 'Bearer ' ?
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // IF SO - split from the 'Bearer ' and target second value
  const token = authHeader.split(' ')[1]

  // VERIFY to decode the data
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' })
    req.user = decoded.UserInfo.username
    req.roles = decoded.UserInfo.roles
    next()
  })
}

export default verifyJWT
