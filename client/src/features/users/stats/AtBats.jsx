const AtBats = ({ stats }) => {
  const atBats = stats?.reduce((acc, curr) => {
    return acc + curr.atBats
  }, 0)
  return (
    <div className="flex flex-col justify-center items-center text-md p-2 bg-white border-2 border-gray-100 rounded shadow-inner shadow-zinc-400">
      <span className="text-gray-500">AB</span>
      <span className="text-4xl text-zinc-800">{atBats}</span>
    </div>
  )
}

export default AtBats
