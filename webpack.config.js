import path from 'path'
import webpack from 'webpack'

const config = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fetch.json.js',
    library: 'fetchJson',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  externals: {
    'isomorphic-fetch': 'isomorphic-fetch'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}

export default config
