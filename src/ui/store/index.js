import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'
import rootSaga from '../sagas'

const routerHistoryMiddleware = routerMiddleware(browserHistory)
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  compose(
    applyMiddleware(routerHistoryMiddleware, sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

sagaMiddleware.run(rootSaga)

if (module.hot) {
  console.log(222)
  module.hot.accept('../reducers', () => {
    const nextReducer = require('../reducers').default
    store.replaceReducer(nextReducer)
  })
}

export default store
