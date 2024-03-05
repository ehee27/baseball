import { useState, useContext } from 'react'
import { StatsContext } from '../../../context/StatsContext'
import { useUpdateUserMutation } from '../usersApiSlice'
import useAuth from '../../../hooks/useAuth'
import Loading from '../../../components/Loading'

const UploadStats = ({ openStats, setOpenStats, setTransition }) => {
  const { addGame } = useContext(StatsContext)
  const { id, stats } = useAuth()
  // ---------------------------------------------------
  // STATE
  const [atBats, setAtBats] = useState(0)
  const [singles, setSingles] = useState(0)
  const [doubles, setDoubles] = useState(0)
  const [triples, setTriples] = useState(0)
  const [homeruns, setHomeruns] = useState(0)
  const [walks, setWalks] = useState(0)
  const [rbis, setRbis] = useState(0)
  const [runs, setRuns] = useState(0)
  const [stolenBases, setStolenBases] = useState(0)
  // const [transition, setTransition] = useState(true)

  // STATS ARRAY
  const hitStats = [
    // { id: 1, label: 'AB', value: atBats, function: setAtBats },
    { id: 2, label: '1B', value: singles, function: setSingles },
    { id: 3, label: '2B', value: doubles, function: setDoubles },
    { id: 4, label: '3B', value: triples, function: setTriples },
    { id: 5, label: 'Homeruns', value: homeruns, function: setHomeruns },
  ]
  const scoreStats = [
    // { id: 1, label: 'AB', value: atBats, function: setAtBats },

    { id: 6, label: 'BB', value: walks, function: setWalks },
    { id: 7, label: 'RBI', value: rbis, function: setRbis },
    { id: 8, label: 'R', value: runs, function: setRuns },
    { id: 8, label: 'SB', value: stolenBases, function: setStolenBases },
  ]
  // UPDATE MUTATION
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  //

  const handleSubmit = async e => {
    e.preventDefault()
    setTransition()
    setOpenStats()
    try {
      // setOpenStats()
      const game = {
        id: stats.length + 1,
        atBats,
        singles,
        doubles,
        triples,
        homeruns,
        walks,
        rbis,
        runs,
        stolenBases,
      }
      setAtBats(0)
      setSingles(0)
      setDoubles(0)
      setTriples(0)
      setHomeruns(0)
      setWalks(0)
      setRbis(0)
      setRuns(0)
      setStolenBases(0)
      // UPDATE USER
      await updateUser({ id: id, stats: [...stats, game] })

      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
        openStats ? 'visible bg-black bg-opacity-80' : 'invisible'
      }`}
    >
      <div className="bg-white rounded shadow-md p-5 text-zinc-600 my-1 w-[80%] min-h-[50%]">
        <div className="flex justify-center items-center my-2">
          <p className="text-xl md:text-3xl text-black my-3">
            Upload Game Stats
          </p>
        </div>
        <div className="bg-zinc-200 w-[100%] rounded">
          <form className="flex flex-col text-zinc-500 rounded-md p-1 w-[100%] bg-white max-h-10/12 overflow-y-scroll">
            {/* ------------ */}
            <div className="bg-zinc-100 rounded-md flex flex-col p-2 md:w-[40%]">
              <label>AB</label>
              <input
                className="bg-white rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
                type="number"
                value={atBats}
                onChange={e => setAtBats(parseInt(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {hitStats.map((item, i) => {
                return (
                  <div
                    className="border-2 border-zinc-100 rounded-md my-2 w-[95%]"
                    key={i}
                  >
                    <div className="flex flex-col p-2">
                      <label>{item.label}</label>
                      <input
                        className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
                        type="number"
                        value={item.value}
                        onChange={e => item.function(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {scoreStats.map((item, i) => {
                return (
                  <div
                    className="border-2 border-zinc-100 rounded-md my-2 w-[95%]"
                    key={i}
                  >
                    <div className="flex flex-col p-2">
                      <label>{item.label}</label>
                      <input
                        className="bg-zinc-100 rounded-lg p-2 shadow-inner shadow-gray-200 text-black mb-3"
                        type="number"
                        value={item.value}
                        onChange={e => item.function(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-center items-center border-zinc-500 p-2">
              <button
                className="btn btn-primary border-2 border-orange-500/80 bg-zinc-900 text-gray-200 font-bold hover:border-white hover:text-white hover:bg-orange-600/90 p-3 rounded-md w-[90%] hover:scale-105 transition-all"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
            <button
              // onClick={setOpenStats()}
              className="fixed top-10 right-10 border-2 border-transparent bg-orange-600 text-white p-3 rounded-md hover:bg-zinc-900 hover:border-white hover:scale-105 transition-all"
            >
              X
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UploadStats
