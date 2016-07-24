const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const PORT = process.env.port || 5000

const config = require('../config/webpack.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  https: false,
  historyApiFallback: true,
}).listen(PORT, (err) => {
  if (err) throw err
  console.log('It\'s development mode now')
  console.log(`Listening at localhost:${PORT}`)
  console.log(`bundle at ${config.output.path}${config.output.publicPath}`)
})
