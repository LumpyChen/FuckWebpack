import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import renderRoutes from './ui/layouts/Routes.jsx'

injectTapEventPlugin()

ReactDOM.render(renderRoutes(), document.getElementById('root'))
