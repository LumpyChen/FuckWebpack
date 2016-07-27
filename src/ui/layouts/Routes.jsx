import React from 'react'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from '../layouts/App.jsx'
import Home from '../components/Home.jsx'
import { Comment, StepOne, StepTwo, StepThree } from '../components/Comment.jsx'
import PackageIntro from '../components/PackageIntro.jsx'
import Add from '../components/Add.jsx'
import Revert from '../components/Revert.jsx'

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
        <IndexRedirect to="/packages" />
        <Route path="/packages" component={Home} >
          <Route path="/new" component={Add} />
          <Route path="/revert" component={Revert} />
          <Route path=":label" component={PackageIntro} />
        </Route>
        <Route path="comment" component={Comment}>
          <IndexRedirect to="one" />
          <Route
            path="(one)(two)(three)"
            components={{ one: StepOne, two: StepTwo, three: StepThree }}
          />
        </Route>
      </Route>
    </Router>
  </Provider>
)
