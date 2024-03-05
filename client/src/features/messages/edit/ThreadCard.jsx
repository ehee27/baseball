const ThreadCard = ({ thread }) => {
  return (
    <div className="bg-white text-black p-3 rounded my-4 shadow-md shadow-zinc-400">
      <p className="text-xs md:text-sm border-b-2">{thread.data}</p>
      <p className="text-xs font-bold mt-2 text-green-700">
        {thread.timeStamp}
      </p>
    </div>
  )
}

export default ThreadCard
