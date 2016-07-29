export default (intro = '', action) => {
  switch (action.type) {
    case 'CHANGE_INTRO': {
      return action.intro
    }
    default:
      return intro
  }
}
