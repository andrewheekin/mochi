var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSass = new ExtractTextPlugin({filename: 'css/bundle.css'});


module.exports = {
  entry: ['./js/scripts.js', './css/main.scss'],
  devtool: 'cheap-module-source-map',
  output: {
    publicPath: '/build/',  // path to use in index.html  
    path: __dirname + '/build',  // output path webpack will use
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
        query: { presets: ['es2015', 'stage-0'] }  // es2015 allows ES6, stage-0 preset allows ES7
      },
      // { //DIDN'T WORK, AS FAR AS I GOT. RUN npm install --save image-webpack-loader file-loader 
      //   // image loader (also requires the file loader), to use things line background-img in CSS
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loaders: [
      //     'file?hash=sha512&digest=hex&name=[hash].[ext]',
      //     'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      //   ]
      // }
    ],
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
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: true,
    //   compress: {
    //     warnings: false, // Suppress uglification warnings
    //     pure_getters: true,
    //     unsafe: true,
    //     unsafe_comps: true,
    //     screw_ie8: true
    //   },
    //   output: {
    //     comments: false,
    //   },
    //   exclude: [/\.min\.js$/gi] // skip pre-minified libs
    // }),    
  ],  
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    historyApiFallback: true
  }
};
