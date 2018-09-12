const path = require('path');

const PKGNAME = 'florence.js'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: PKGNAME,
    path: path.resolve(__dirname, 'dist')
  }
};
