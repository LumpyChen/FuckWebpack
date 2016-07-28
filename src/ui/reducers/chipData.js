export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_PACKAGE': {
      const newChip = Object.assign({}, action.data, {
        key: state[state.length - 1].key + 1,
      })
      return state.concat(newChip)
    }
    case 'DEL_PACKAGE': {
      const chipDel = Object.assign({}, state)
      chipDel.splice(action.key, 1)
      return chipDel
    }
    default:
      return state || []
  }
}
