import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from '../layouts/App.jsx'
import Home from '../components/Home.jsx'
import Comment from '../components/Comment.jsx'
import PackageIntro from '../components/PackageIntro.jsx'

const store = createStore(
  combineReducers({
    routing: routerReducer,
  })
)

const history = syncHistoryWithStore(browserHistory, store)


export const renderRoutes = () => (
  <Provider store={store} >
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Comment} />
        <Route path="comment" component={Home} >
          <Route path="/package/:label" component={PackageIntro} />
        </Route>
      </Route>
    </Router>
  </Provider>
)
