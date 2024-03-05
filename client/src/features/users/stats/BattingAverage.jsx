const BattingAverage = ({ stats }) => {
  const atBats = stats?.reduce((acc, curr) => {
    return acc + curr.atBats
  }, 0)
  // HITS
  const hits = stats.reduce((acc, curr) => {
    return acc + curr.singles + curr.doubles + curr.triples + curr.homeruns
  }, 0)
  // CURRENT AVG
  const currentAVG = (hits / atBats).toFixed(3).slice(2)

  return (
    <div className="flex flex-col justify-center items-center text-md p-2 bg-white border-2 border-gray-100 rounded shadow-inner shadow-zinc-400">
      <span className="text-gray-500">AVG</span>
      <span className="text-3xl text-zinc-800">.{currentAVG}</span>
    </div>
  )
}

export default BattingAverage
