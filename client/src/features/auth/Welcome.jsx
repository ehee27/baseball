// import useAuth from '../../hooks/useAuth'

import { Link } from 'react-router-dom'

const Welcome = () => {
  // const { username } = useAuth()
  //
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date)
  const content = (
    <>
      <div className="border-2 p-3">
        {/* <div className="hero-overlay bg-black bg-opacity-70">
          <div className="flex flex-col min-h-[100%] pt-20 text-white"> */}
        <div className="py-10 px-6 mx-10">
          <h1 className="font-sans text-sm md:text-2xl lg:text-5xl font-black p-5 text-center">
            Welcome to the DASH
          </h1>
          <div className="flex flex-col gap-4 text-left text-sm md:text-xl my-4">
            <p className="text-md">
              Today is: <span className="text-green-400">{today}</span>
            </p>
            <Link className="text-xl text-gray-500" to="/dash/users">
              View Users
            </Link>
            <Link className="text-xl text-gray-500" to="/dash/messages">
              View Messages
            </Link>
          </div>
        </div>
      </div>
    </>
  )
  return content
}

export default Welcome
