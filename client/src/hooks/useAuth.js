import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)

  let isPlayer = false
  let isCoach = false
  let status = 'User'

  if (token) {
    const decoded = jwtDecode(token)
    const {
      id,
      name,
      username,
      roles,
      active,
      position,
      bio,
      profilePic,
      stats,
      age,
      height,
      weight,
      bats,
      throws,
      hs,
    } = decoded.UserInfo

    isPlayer = roles.includes('Player')
    isCoach = roles.includes('Coach')

    if (isPlayer) status = 'Player'
    if (isCoach) status = 'Coach'

    return {
      id,
      name,
      username,
      roles,
      active,
      position,
      bio,
      profilePic,
      stats,
      status,
      isPlayer,
      isCoach,
      age,
      height,
      weight,
      bats,
      throws,
      hs,
    }
  }

  return { username: '', roles: [], isPlayer, isCoach, status }
}
export default useAuth
