// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
// import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'
import panther from '../../../public/assets/panther.png'

const DashFooter = () => {
  // const navigate = useNavigate()
  // const { pathname } = useLocation()
  // // SEND LOGOUT MUTATION
  // const [sendLogout, { isLoading, isSuccess, isError, error }] =
  //   useSendLogoutMutation()
  const { username, status } = useAuth()

  // GO HOME
  // const onGoHomeClicked = () => navigate('/dash')
  // LOGOUT
  // const handleLogout = () => {
  //   sendLogout()
  //   navigate('/')
  // }

  // let goHomeButton = null
  // if (pathname !== '/dash') {
  //   goHomeButton = (
  //     <button
  //       className="btn btn-accent text-white rounded.lg w-[5%] rounded-md p-1"
  //       onClick={onGoHomeClicked}
  //     >
  //       <FontAwesomeIcon icon={faHouse} />
  //     </button>
  //   )
  // }

  return (
    <div className="sticky footer inset-x-0 bottom-0 flex flex-col gap-2 bg-zinc-950 text-white py-2 px-5">
      <div className="flex flex-col justify-center items-center py-4 w-[100%]">
        <img
          className="h-[30%] w-[10%] max-h-[40px] max-w-[60px] mb-1"
          src={panther}
        ></img>
        <div>{/* <Link to="/">{goHomeButton}</Link> */}</div>

        <p className="text-sm">
          Current User:{' '}
          <span className="font-bold text-orange-400">{username}</span>{' '}
        </p>
        <p className="text-sm">Status: {status} </p>
      </div>
    </div>
  )
}

export default DashFooter
