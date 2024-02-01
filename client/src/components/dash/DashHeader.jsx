import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
// import Drawer from './Drawer'
import useAuth from '../../hooks/useAuth'
//
const DASH_REGEX = /^\/dash(\/)?$/
const MESSAGES_REGEX = /^\/dash\/messages(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const iconData = [
  { icon: faFileCirclePlus, link: '/dash/messages/new' },
  { icon: faFilePen, link: '/dash/messages' },
  { icon: faUserGear, link: '/dash/users' },
  { icon: faUserPlus, link: '/dash/users/new' },
]

const DashHeader = () => {
  const navigate = useNavigate()
  // const { pathname } = useLocation()

  // DESTRUCTURE FROM AUTH
  const { isPlayer, isCoach } = useAuth()

  // SEND LOGOUT --------------------
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  // CHECK FOR SUCCESS
  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  // CONTENT
  const content = (
    <div className="flex justify-between items-center bg-zinc-500 text-white p-3">
      <div>Dash Header</div>
      <div className="flex gap-4 justify-end w-[40%]">
        {/* IF PLAYER LOGGED IN, MAP THROUGH LINK ICONS */}
        {isPlayer ? (
          iconData.map((item, i) => {
            return (
              <button key={i} onClick={() => navigate(item.link)}>
                <FontAwesomeIcon icon={item.icon} />
              </button>
            )
          })
        ) : (
          <span></span>
        )}
        {/* LOGOUT ICON ------------------------- */}
        <button onClick={() => sendLogout()}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  )

  return content
}
export default DashHeader
