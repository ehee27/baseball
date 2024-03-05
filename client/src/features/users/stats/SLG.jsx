const SLG = ({ stats }) => {
  // AT BATS
  const atBats = stats.reduce((acc, curr) => {
    return acc + curr.atBats
  }, 0)

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

  return (
    <div className="flex flex-col justify-center items-center text-md p-2 bg-white border-2 border-gray-100 rounded shadow-inner shadow-zinc-400">
      <span className="text-gray-500">SLG</span>
      <span className="text-3xl text-zinc-800">.{currentSLG}</span>
    </div>
  )
}

export default SLG
