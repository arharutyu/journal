function reducer(currentState, action) {
  switch(action.type) {
    case 'setEntries':
      return {
      // deconstruct into key value pairs (entries & categories keys)
      ...currentState,
      // update entries value with entries from action
      entries: action.entries
    }
    case 'addEntry':
      return {
        ...currentState,
        entries: [...currentState.entries, action.entry]
      }
    default:
      return currentState
  }
}

const initialState = {
  entries: [],
  categories: []
}

export { reducer, initialState }