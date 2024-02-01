import useAuth from '../../hooks/useAuth'

import { Link } from 'react-router-dom'

const Welcome = () => {
  const { username } = useAuth()
  //
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date)
  const content = (
    <>
      <div className="bg-gray-100 p-3">
        {/* <div className="hero-overlay bg-black bg-opacity-70">
          <div className="flex flex-col min-h-[100%] pt-20 text-white"> */}
        <div className="py-10">
          <h1 className="text-2xl md:text-4xl font-black">
            Welcome {username}
          </h1>
          <div className="flex flex-col gap-4 text-left text-xs md:text-md my-4">
            <p>
              Today is: <span className="text-green-400">{today}</span>
            </p>
            <Link className="text-sm text-gray-500" to="/dash/users">
              <button className="border-2 p-2 rounded-md shadow-sm hover:bg-gray-200 hover:scale-105 transition-all">
                View Users
              </button>
            </Link>
            <Link className="text-sm text-gray-500" to="/dash/messages">
              <button className="border-2 p-2 rounded-md shadow-sm hover:bg-gray-200 hover:scale-105 transition-all">
                View Messages
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
  return content
}

export default Welcome
