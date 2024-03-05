const OPS = ({ stats }) => {
  // AT BATS
  const atBats = stats.reduce((acc, curr) => {
    return acc + curr.atBats
  }, 0)

  // REACHED SAFELY
  const reachedBase = stats.reduce((acc, curr) => {
    return (
      acc +
      curr.singles +
      curr.doubles +
      curr.triples +
      curr.homeruns +
      curr.walks
    )
  }, 0)
  // DIVIDE AND FORMAT
  const currentOBP = (reachedBase / atBats).toFixed(3).slice(2)

  // TOTAL BASES
  const totalBases = stats.reduce((acc, curr) => {
    return (
      acc +
      curr.singles +
      curr.doubles * 2 +
      curr.triples * 3 +
      curr.homeruns * 4
    )
  }, 0)
  // DIVIDE AND FORMAT
  const currentSLG = (totalBases / atBats).toFixed(3).slice(2)

  // OPS
  const currentOPS = parseInt(currentOBP) + parseInt(currentSLG)

  return (
    <div className="flex flex-col justify-center items-center text-md font-bold p-2 border-2 border-gray-100 rounded shadow-inner shadow-zinc-400">
      <span className="text-gray-300">OPS</span>
      <span className="text-3xl text-orange-500">.{currentOPS}</span>
    </div>
  )
}

export default OPS
