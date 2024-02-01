import { ImSpinner } from 'react-icons/im'
import logo from '../../public/assets/minor-league-baseball-6-logo-png-transparent.png'

const Loading = () => {
  return (
    <div className="min-h-screen">
      {/* <ImSpinner className="h-20 w-40 mx-auto text-green-500 animate-spin" /> */}
      <img
        className="h-80 w-60 mx-auto text-green-500 animate-pulse"
        src={logo}
      ></img>
    </div>
  )
}

export default Loading
