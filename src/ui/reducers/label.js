export default (label = '', action) => {
  switch (action.type) {
    case 'CHANGE_LABEL': {
      return action.label
    }
    default:
      return label
  }
}
