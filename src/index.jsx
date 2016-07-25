import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { renderRoutes } from './ui/layouts/Routes.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin()

ReactDOM.render(
  <MuiThemeProvider>
    {renderRoutes()}
  </MuiThemeProvider>
  , document.getElementById('root'))
