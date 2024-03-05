import { ImSpinner } from 'react-icons/im'
import logo from '../../public/assets/panther.png'

const Loading = () => {
  return (
    <div className="h-[100vh] bg-black/90">
      <div
        className={`bg-center bg-cover bg-[url(../../../../public/assets/CWS.webp)] h-3/5`}
      >
        <div className="flex gap-2 flex-col items-center bg-black/90 min-h-screen px-5 py-20">
          {/* <ImSpinner className="h-20 w-40 mx-auto text-green-500 animate-spin" /> */}
          <img
            className="h-80 w-100 mx-auto text-green-500 animate-pulse"
            src={logo}
          ></img>
        </div>
      </div>
    </div>
  )
}

export default Loading
