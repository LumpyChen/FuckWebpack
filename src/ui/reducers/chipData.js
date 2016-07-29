export default (state = [
  { key: 0, label: 'immutablejs', intro: '1' },
  { key: 1, label: 'material-ui', intro: '2' },
  { key: 2, label: 'radium', intro: '3' },
  { key: 3, label: 'react', intro: '4' },
  { key: 4, label: 'react-dom', intro: '5' },
  { key: 5, label: 'react-router', intro: '6' },
  { key: 6, label: 'react-redux/redux', intro: '7' },
  { key: 7, label: 'react-router-redux', intro: '8' },
  { key: 8, label: 'redux-saga', intro: '9' },
  { key: 9, label: 'redux-undo', intro: '9' },
], action) => {
  switch (action.type) {
    case 'ADD_PACKAGE': {
      const newChip = Object.assign({}, action.data, {
        key: state[state.length - 1].key + 1,
      })
      return state.concat(newChip)
    }
    case 'DEL_PACKAGE': {
      const chipDel = state.slice()
      return chipDel.filter((ele) => (
        ele.key !== action.delkey
      ))
    }
    default:
      return state
  }
}
