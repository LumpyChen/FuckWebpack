/**
 * Created by Lumpychen on 16/3/11.
 */

const App = require('./components/App'),
    ReactDOM = require('react-dom');

require('./bower_components/bootstrap/dist/js/bootstrap');
require('./bower_components/bootstrap/less/bootstrap.less');

ReactDOM.render(<App />,document.getElementById('root'));