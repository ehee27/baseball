import useAuth from '../../../hooks/useAuth'
const DataColumn = () => {
  const { name, position, age, height, weight, bats, throws, hs } = useAuth()
  return (
    <div className="flex flex-col text-white">
      <div className="flex gap-2 items-center pl-1">
        <p className="text-3xl md:text-2xl lg:text-6xl">{name}</p>
        <p className="text-3xl">|</p>
        <p className="text-3xl md:text-6xl mr-20">{position}</p>
      </div>
      {/* ----------------- */}
      <div className="flex flex-col p-2 text-sm font-bold md:text-2xl text-white mb-7">
        <div className="flex">
          <div className="flex gap-2">
            <p>{height} - </p>
            <p> {weight}</p>
          </div>
          {/* ----------------- */}
          <div className="flex gap-2 ml-2">
            <p>|</p>
            <p>Bats: {bats}</p>
            <p>Throws: {throws}</p>
          </div>
          <div className="flex gap-2 ml-2">
            <p>|</p>
            <p>Age: {age}</p>
          </div>
        </div>

        {/* ----------------- */}
        <div className="text-xl mt-2">
          <p>HS: {hs}</p>
        </div>
      </div>
    </div>
  )
}

export default DataColumn
