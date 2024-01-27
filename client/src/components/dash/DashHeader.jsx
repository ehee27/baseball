import { useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faRightFromBracket,
//   faFileCirclePlus,
//   faFilePen,
//   faUserGear,
//   faUserPlus,
// } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
// import Drawer from './Drawer'
// import useAuth from '../../hooks/useAuth'
//
const DASH_REGEX = /^\/dash(\/)?$/
const MESSAGES_REGEX = /^\/dash\/messages(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
  const content = <div className="flex bg-zinc-700 p-1">Dash Header</div>

  return content
}
export default DashHeader
