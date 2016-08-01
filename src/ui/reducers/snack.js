import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  snackAdd: false,
  snackRm: false,
  snackRv: false,
  snackRs: false,
})

export default (snack = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SNACK_ADD': {
      return snack.set('snackAdd', !snack.get('snackAdd'))
    }
    case 'TOGGLE_SNACK_RM': {
      return snack.set('snackRm', !snack.get('snackRm'))
    }
    case 'TOGGLE_SNACK_RV': {
      return snack.set('snackRv', !snack.get('snackRv'))
    }
    case 'TOGGLE_SNACK_RS': {
      return snack.set('snackRs', !snack.get('snackRs'))
    }
    default: return snack
  }
}
