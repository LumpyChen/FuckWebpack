export default (verify = 'empty', action) => {
  switch (action.type) {
    case 'VERIFY_LABEL': {
      let newVerify
      action.chipData.forEach((ele) => {
        newVerify = ele.label === action.label ? 'same' : newVerify
      })
      newVerify = action.label.trim() === '' ? 'empty' : newVerify
      return newVerify || 'true'
    }
    case 'SET_EMPTY': {
      return 'empty'
    }
    default:
      return verify
  }
}
