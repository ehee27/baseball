import { useState, useContext } from 'react'
import { StatsContext } from '../../../context/StatsContext'
import GamesList from '../stats/GamesList'
import { useUpdateUserMutation } from '../usersApiSlice'

const StatsUpload = ({ stats, openStats, onClose, setTransition, id }) => {
  const { addGame, games } = useContext(StatsContext)
  // UPDATE MUTATION
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  // STATE
  const [hits, setHits] = useState('')
  const [atBats, setAtBats] = useState('')

  // HANDLE SUBMIT - creates a game, adds the game - reloads window to render
  const handleSubmit = async e => {
    e.preventDefault()

    // const game = { id: stats?.length + 1, hits, atBats }
    addGame({ id: stats.length + 1, hits, atBats })
    setHits('')
    setAtBats('')
  }
  // HANDLE SAVE
  const handleSave = async () => {
    setTransition()
    await updateUser({ id: id, stats: [...games.games] })
    setTimeout(() => {
      setTransition()
      window.location.reload()
    }, 1000)
  }
  return (
    <div className="h-[100vh] bg-black/90">
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
          openStats ? 'visible' : 'invisible'
        }`}
      >
        <p className="text-white">Upload game stats</p>
        <div className="border-4 w-[80%] md:w-[100%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-zinc-500 rounded-md p-5 w-[90%] md:w-[30%] bg-white"
          >
            <input
              className="bg-gray-100 p-2 text-gray-500 m-1"
              value={hits}
              onChange={e => setHits(Number(e.target.value))}
              placeholder="Hits"
            />
            <input
              className="bg-gray-100 p-2 text-gray-500 m-1"
              placeholder="At Bats"
              value={atBats}
              onChange={e => setAtBats(Number(e.target.value))}
            />
            <div className="flex flex-col gap-2 mt-2">
              <button className="bg-green-500 p-2 rounded-md text-white w-[60%]">
                UPLOAD GAME
              </button>
              <button
                onClick={handleSave}
                className="bg-orange-600 p-2 rounded-md text-white w-[60%]"
              >
                SAVE STATS
              </button>
            </div>
            <button
              onClick={onClose}
              className="absolute top-10 right-10 p-1 rounded-lg text-white bg-green-700 hover:bg-gray-50 hover:text-gray-600 w-[20%]"
            >
              X
            </button>
          </form>
        </div>
        <div className="p-2 w-[80%] md:w-[60%] mt-4">
          <GamesList />
        </div>
      </div>
    </div>
  )
}

export default StatsUpload
