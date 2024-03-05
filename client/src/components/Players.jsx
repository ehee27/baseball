// import StatsTracker from '../components/STButton'
import { PiIdentificationBadgeBold } from 'react-icons/pi'
import { PiBaseballCapBold } from 'react-icons/pi'
import { PiChatsBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const howItWorks = [
  {
    id: 1,
    heading: 'Create your player profile',
    details:
      'Create an account to upload your personal bio and your school/club team info. Let coaches know who you are and what kind of player you can be in their program.',
    icon: <PiBaseballCapBold />,
  },
  {
    id: 2,
    heading: 'Customize your media and stats',
    details: `Upload a primary profile pic as well as game/showcase action. Use StatsTRAKER to upload game data so coaches can follow you this season.`,
    icon: <PiIdentificationBadgeBold />,
  },
  {
    id: 3,
    heading: 'Connect with coaches and scouts',
    details:
      'Instantly get notified when a coache requests more info or a connection. You will need to approve them before procedding. You have the option to block any unwanted contacts.',
    icon: <PiChatsBold />,
  },
]

const Players = () => {
  return (
    <div className="py-2 px-2 md:py-10 md:px-20 bg-black">
      <h1 className="text-3xl md:text-5xl lg:text-6xl p-5 text-center text-white">
        Players
      </h1>
      {/* --- GRID START ----- */}
      <div className="grid grid-cols-1">
        {/* ----------------- */}

        <div className="flex flex-col gap-3 my-1 border-2 bg-gray-100 rounded-md p-2">
          {howItWorks.map((item, i) => {
            return (
              <div key={i} className="my-2">
                <div className="flex">
                  <p className="flex justify-center items-center text-md md:text-xl text-white w-[30%] bg-zinc-400">
                    STEP {item.id}.
                  </p>
                  <span className="flex justify-center items-center text-sm md:text-3xl bg-zinc-600 text-white px-3 py-1 w-[70%]">
                    {item.heading}
                  </span>
                </div>

                <div className="shadow-md flex my-2 text-neutral bg-white">
                  <div className="flex items-center text-5xl bg-orange-600/90 p-5 text-white">
                    <span className="text-7xl text-zinc-100">{item.icon}</span>
                  </div>

                  <div className="flex flex-col w-[100%]">
                    <span className="text-sm md:text-xl p-3">
                      {item.details}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col justify-center items-center my-1 bg-gradient-to-b from-zinc-900 to-black p-5 rounded-md mb-20 py-10">
          {/* <div className="flex">
            <StatsTracker />
          </div> */}
          <button className="btn btn-primary border-2 border-orange-500/80 bg-zinc-900 text-gray-200 font-bold hover:border-white hover:text-white hover:bg-orange-600/90 p-3 rounded-md w-[50%] hover:scale-105 transition-all">
            <Link className="text-white hover:text-white" to="/new">
              GET STARTED NOW
            </Link>
          </button>
        </div>
        {/*  */}
      </div>
      {/* ----------------- */}
    </div>
  )
}

export default Players
