const path = require('path');

const PKGNAME = 'floorence.js'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: PKGNAME,
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
