const path = require('path');
 
module.exports = {
  entry: './js/modules/index.js',
  output: {
    filename: 'family-t.js',
    path: path.resolve(__dirname, 'js'),
  },
  mode: 'development',
  externals: {
    jquery: 'jQuery'
  }
};