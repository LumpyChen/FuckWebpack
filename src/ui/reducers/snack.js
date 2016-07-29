export default (snack = {
  snackAdd: false,
  snackRm: false,
  snackRv: false,
}, action) => {
  switch (action.type) {
    case 'TOGGLE_SNACK_ADD': {
      return Object.assign({}, {
        snackAdd: !snack.snackAdd,
        snackRm: snack.snackRm,
        snackRv: snack.snackRv,
      })
    }
    case 'TOGGLE_SNACK_RM': {
      return Object.assign({}, {
        snackAdd: snack.snackAdd,
        snackRm: !snack.snackRm,
        snackRv: snack.snackRv,
      })
    }
    case 'TOGGLE_SNACK_RV': {
      return Object.assign({}, {
        snackAdd: snack.snackAdd,
        snackRm: snack.snackRm,
        snackRv: !snack.snackRv,
      })
    }
    default: return snack
  }
}
