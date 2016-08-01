import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import chipData from './chipData'
import intro from './intro'
import label from './label'
import verify from './verify'
import snack from './snack'

export default combineReducers({
  chipData,
  intro,
  label,
  verify,
  snack,
  routing: routerReducer,
})
