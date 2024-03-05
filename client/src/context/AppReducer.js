export default (state, action) => {
  switch (action.type) {
    case 'ADD_GAME':
      return {
        ...state,
        games: [...state.games, action.payload],
      }
    case 'DELETE_GAME':
      return {
        ...state,
        games: state.games.filter(game => game.id !== action.payload),
      }
    default:
      return state
  }
}
