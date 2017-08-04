/**
 * Program to start express server for dev testing.
 */
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./build/webpack.config.development')

const app = express()
const compiler = webpack(config)
const port = process.env.port || 3000

/**
 * Webpack dev and hot middleware are used during development for serving js files and hot reload
 */
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './tests/index.html'))
})

app.listen(port, '10.0.8.165', function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://0.0.0.0:' + port)
})
