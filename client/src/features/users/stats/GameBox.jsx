const GameBox = ({ game }) => {
  const hits = game.singles + game.doubles + game.triples + game.homeruns
  return (
    <div className="flex gap-2 items-center p-2 bg-white my-1 rounded-md shadow-inner shadow-zinc-500">
      <div className="bg-zinc-100 text-sm py-1 px-2 rounded">
        <p className="font-bold">Game {game.id}</p>
      </div>

      <div className="">
        <p>
          {hits} for {game.atBats}
        </p>
      </div>
      {/* <div className="flex justify-center items-center border-l-4 px-2">
        {game.doubles === 1 && <p>{game.doubles} double</p>}
        {game.doubles > 1 && <p>{game.doubles} doubles</p>}
      </div> */}
      {/* <div className="flex justify-center items-center border-l-4 px-2">
        {game.triples === 1 && <p>{game.triples} triple</p>}
        {game.triples > 1 && <p>{game.triples} triples</p>}
      </div> */}
      <div className="flex justify-center items-center border-l-4 px-2 text-orange-600 font-bold">
        {game.homeruns === 1 && <p>{game.homeruns} HR</p>}
        {game.homeruns > 1 && <p>{game.homeruns} HRs</p>}
      </div>
      <div className="flex justify-center items-center border-l-4 px-2 text-orange-600 font-bold">
        {game.rbis === 1 && <p>{game.rbis} RBI</p>}
        {game.rbis > 1 && <p>{game.rbis} RBIs</p>}
      </div>
      <div className="flex justify-center items-center border-l-4 px-2 text-orange-600 font-bold">
        {game.runs === 1 && <p>{game.runs} RUN</p>}
        {game.runs > 1 && <p>{game.runs} RUNSs</p>}
      </div>
      <div className="flex justify-center items-center border-l-4 px-2 text-orange-600 font-bold">
        {game.stolenBases === 1 && <p>{game.stolenBases} SB</p>}
        {game.stolenBases > 1 && <p>{game.stolenBases} SBs</p>}
      </div>
    </div>
  )
}

export default GameBox
