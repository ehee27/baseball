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
    const { username, roles } = decoded.UserInfo

    isPlayer = roles.includes('Player')
    isCoach = roles.includes('Coach')

    if (isPlayer) status = 'Player'
    if (isCoach) status = 'Coach'

    return { username, roles, status, isPlayer, isCoach }
  }

  return { username: '', roles: [], isPlayer, isCoach, status }
}
export default useAuth
