import useAuth from '../../../hooks/useAuth'
import GameBox from './GameBox'

const GamesList = ({ setOpenStats }) => {
  const { stats } = useAuth()

  return (
    <div className="bg-zinc-500 rounded-md w-[100%]">
      <div className="flex gap-2 items-center bg-black/80 p-2">
        <div className="w-[50%]">
          <p className="text-2xl font-bold px-1 text-white">Game Log</p>
        </div>
        <div className="w-[50%]">
          <button
            className="btn btn-primary border-2 border-orange-500/80 bg-orange-500/80 hover:bg-orange-500 hover:border-white text-white p-3 rounded-md w-[100%] md:w-[100%] transition-all"
            onClick={setOpenStats}
          >
            Upload Stats
          </button>
        </div>
      </div>
      <div className="p-2 h-[300px] overflow-x-scroll">
        {stats?.map((game, i) => {
          return <GameBox game={game} key={i} />
        })}
      </div>
    </div>
  )
}

export default GamesList
