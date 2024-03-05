import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRightFromBracket,
  // faFileCirclePlus,
  // faUserPlus,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
import useAuth from '../../hooks/useAuth'

const DashHeader = () => {
  const navigate = useNavigate()

  // DESTRUCTURE FROM AUTH
  const { isPlayer, isCoach, id } = useAuth()

  // SEND LOGOUT --------------------
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  // CHECK FOR SUCCESS
  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  // HANDLE LOGOUT
  const handleLogout = async () => {
    try {
      sendLogout()
      localStorage.removeItem('games')
    } catch (error) {
      console.log(error)
    }
  }

  // CONTENT
  const content = (
    <div className="flex justify-between items-center bg-orange-600/90 text-white py-3 px-10">
      <div>
        <Link to="/dash">Me</Link>
      </div>
      <div className="flex gap-8 justify-end w-[40%] text-zinc-200 font-bold text-lg">
        {/* IF PLAYER LOGGED IN, MAP THROUGH LINK ICONS */}
        {isPlayer ? (
          <button
            className="border-2 border-transparent py-1 px-2 rounded-3xl hover:border-white hover:scale-105 transition-all"
            onClick={() => navigate('/dash/users')}
          >
            <FontAwesomeIcon icon={faUsers} />
          </button>
        ) : (
          <span></span>
        )}
        {/* LOGOUT ICON ------------------------- */}
        <button
          className="border-2 border-transparent py-1 px-2 rounded-3xl hover:border-white hover:scale-105 transition-all"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  )

  return content
}
export default DashHeader
