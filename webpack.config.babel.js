import 'webpack';
import path from 'path';

module.exports = {
  entry: __dirname + '/js/scripts.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/build/js',
    filename: 'bundle.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    root: path.resolve('./js'),
    extensions: ['', '.js']
  }
};
