import { createContext, useState, useEffect } from 'react'

const initialState = {
  games: [],
}

// CHECK LOCAL STORAGE
const setInitialState = () => {
  const foundStats = localStorage.getItem('games')
  return foundStats ? JSON.parse(foundStats) : initialState
}

// CREATE THE CONTEXT
export const StatsContext = createContext()
// CREATE THE PROVIDER
export const StatsContextProvider = ({ children }) => {
  const [games, setGames] = useState(setInitialState)

  useEffect(() => {
    localStorage.setItem('games', JSON.stringify(games))
  }, [games])

  const addGame = gameStats => {
    setGames(prev => ({
      ...prev,
      games: [...prev.games, gameStats],
    }))
  }
  // const addGame = gameStats => {
  //   setGames({
  //     games: [...games, gameStats],
  //   })
  // }
  // DELETE GAME
  const deleteGame = gameId => {
    setGames(prev => ({
      ...prev,
      games: prev.games.filter(game => game.id !== gameId),
    }))
  }

  return (
    <StatsContext.Provider value={{ games: games, addGame, deleteGame }}>
      {children}
    </StatsContext.Provider>
  )
}
