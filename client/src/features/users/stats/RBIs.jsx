const RBIs = ({ stats }) => {
  const RBIs = stats.reduce((acc, curr) => {
    return acc + curr.rbis
  }, 0)
  return (
    <div className="flex flex-col justify-center items-center text-md p-2 bg-white border-2 border-gray-100 rounded shadow-inner shadow-zinc-400">
      <span className="text-gray-500">RBI</span>
      <span className="text-4xl text-zinc-800">{RBIs}</span>
    </div>
  )
}

export default RBIs
