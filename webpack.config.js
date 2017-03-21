var webpack = require('webpack');
var path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: ['./js/scripts.js'],
  // entry: ['./js/scripts.js', './css/main.scss', './css/style.css'],
  devtool: 'inline-source-map',
  output: {
    publicPath: '/build/',  // path to use in index.html  
    path: __dirname + '/build',  // path webpack will use
    filename: 'js/bundle.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
    ],
    // rules: [
    //   {
    //     test: /\.css$/,
    //     loader: ExtractTextPlugin.extract({loader: 'css-loader?importLoaders=1'}),
    //   },
    //   {
    //     test: /\.scss$/,
    //     loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    //   }
    // ],
  },
  // plugins: [
  //   new ExtractTextPlugin({
  //     filename: 'css/bundle.css',
  //     allChunks: true,
  //   }),
  //   new HtmlWebpackPlugin({
  //     template: './index.html',
  //   }),
  // ],  
  resolve: {
    extensions: ['.js']
  }
};
