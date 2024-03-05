import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import CardModal from './modals/CardModal'
import StatGrid from '../users/stats/StatGrid'

const User = ({ userId }) => {
  const [openCard, setOpenCard] = useState(false)
  const [expanded, setExpanded] = useState(false)
  //
  const user = useSelector(state => selectUserById(state, userId))

  if (user) {
    const handleConnect = () => setOpenCard(!openCard)

    return (
      <div className="bg-black/90 rounded-lg shadow-md p-1 text-black my-2 border-2 border-white">
        <div className="flex gap-2 justify-center p-2">
          {/* ------------ Player Pic ------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex justify-center items-center w-[100%] rounded-md py-2">
              <img
                className="h-[100%] w-[100%] max-h-[200px] max-w-[150px] rounded-lg"
                src={`/public/assets/${user.profilePic}`}
              ></img>
            </div>

            {/* ------------ Player Data ------------------- */}
            <div className="col-span-2 w-[100%] p-2 rounded-md text-white">
              <div className="flex">
                <p className="text-md md:text-xl font-bold">{user.name} |</p>
                <p className="text-md md:text-xl font-bold ml-2">
                  {user.position}
                </p>
              </div>
              <div className="mt-2">
                <div className="flex gap-3">
                  <p className="text-xs md:text-xl">{user.height}</p>
                  <p className="text-xs md:text-xl">{user.weight} lbs</p>
                </div>
              </div>
              <div className="flex mt-2">
                {' '}
                <p className="text-xs md:text-sm font-bold text-orange-400">
                  HS: {user.hs}
                </p>
              </div>
              {/* ------------ Bio with Expand Functionality---------------- */}
              <div className="flex gap-2 mt-4 text-white">
                {expanded ? (
                  <p>
                    {user.bio}{' '}
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="font-bold p-1 text-orange-500"
                    >
                      Less
                    </button>
                  </p>
                ) : (
                  <p>
                    {user.bio.substring(0, 300)}{' '}
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="font-bold p-1 text-orange-500"
                    >
                      More
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* --------------- STATS ---------------- */}
        </div>
        <div className="bg-zinc-900 p-3">
          <div className="text-white">
            STATS
            <StatGrid stats={user.stats} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleConnect}
              className="btn btn-primary border-2 border-orange-500/80 bg-zinc-900 text-gray-200 font-bold hover:border-white hover:text-white hover:bg-orange-600/90 p-3 rounded-md w-[100%] md:w-[35%] hover:scale-105 mb-5 transition-all"
            >
              Connect
            </button>
          </div>
        </div>

        <CardModal
          user={user}
          openCard={openCard}
          onClose={() => setOpenCard(!openCard)}
        />
      </div>
    )
  } else return null
}
export default User
