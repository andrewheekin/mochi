var webpack = require('webpack');
var path = require('path');
var BabiliPlugin = require('babili-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

var extractSass = new ExtractTextPlugin({filename: 'css/bundle.css'});


module.exports = {
  entry: ['./js/scripts.js', './css/main.scss'],
  // entry: ['./js/scripts.js', './css/main.scss', './css/style.css'],
  devtool: 'inline-source-map',
  // devtool: 'source-map',  
  output: {
    publicPath: '/build/',  // path to use in index.html  
    path: __dirname + '/build',  // path webpack will use
    filename: 'js/bundle.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: { presets: ['es2015'] }
    }],
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }],
        fallback: 'style-loader'
      })
    }]
  },
  plugins: [
    extractSass,
    // new BabiliPlugin({sourceMap: false})
  ],  
  resolve: {
    extensions: ['.js']
  }
};
