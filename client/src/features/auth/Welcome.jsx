import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MessagesList from '../messages/MessageList'

const buttons = [
  { label: 'MY PROFILE', link: '/dash/users/profile' },
  { label: 'MY MESSAGES', link: '/dash/messages' },
]

const Welcome = () => {
  const navigate = useNavigate()
  //
  const { name, username, bio, stats } = useAuth()

  // DATE VARIABLES ---------------------
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'long',
  }).format(date)

  // CONTENT VARIABLE
  const content = (
    <div className="h-[100vh]">
      {/* ------------------- OUTER DIV - bg image ------------------------ */}
      <div
        className={`bg-center bg-cover bg-[url(../../../public/assets/lockerroom.webp)] h-[100%]`}
      >
        {/* ------------------- INNER OVERLAY FOR COLOR ------------------------ */}
        <div className="bg-black/90 h-[100%]">
          {/* ------------------- TOP BANNER ------------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-7 bg-black/80 text-white rounded py-10 px-5 md:px-40">
            {/* ------------------- WELCOME ------------------------ */}
            <div className="col-span-4">
              <h1 className="text-3xl md:text-6xl font-black">
                Welcome {username}
              </h1>
              <div className="flex flex-col gap-4 text-left text-sm md:text-lg my-4">
                <p>
                  Today is: <span className="text-green-400">{today}</span>
                </p>
              </div>
              <p>{name}</p>
              <div className="flex flex-col gap-2 mt-10 my-5">
                {buttons.map((item, i) => (
                  <>
                    <button
                      className="btn btn-primary border-2 border-orange-500/80 bg-zinc-900 text-gray-200 font-bold hover:border-white hover:text-white hover:bg-orange-600/90 p-3 rounded-md w-[100%] md:w-[50%] hover:scale-105 transition-all"
                      onClick={() => navigate(`${item.link}`)}
                      key={i}
                    >
                      {item.label}
                    </button>
                  </>
                ))}
              </div>
            </div>
            {/* ------------------- MESSAGES ------------------------ */}
            <div className="col-span-3 border-2 border-zinc-700 bg-zinc-800/70 rounded-md p-3 shadow-inner shadow-black">
              <div className="flex gap-4 justify-end items-center py-2 pr-1">
                <p>My Messages</p>
                <FontAwesomeIcon icon={faMessage} className="text-sm" />
              </div>{' '}
              <div className="max-h-[350px] overflow-y-scroll rounded shadow-inner shadow-black py-1 px-3">
                <MessagesList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  return content
}

export default Welcome
