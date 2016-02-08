'use strict';

var path              = require( 'path' );
var webpack           = require( 'webpack' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var autoprefixer      = require( 'autoprefixer' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join( __dirname, 'src/index.js' )
  ],

  output: {
    path:       path.join( __dirname, '/public/' ),
    filename:   '[name].js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test:    /\.js?$/,
        exclude: /node_modules/,
        loader:  'babel'
      },
      {
        test:    /\.json?$/,
        exclude: /node_modules/,
        loader:  'json'
      },
      {
        test:    /\.(css|scss)$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ]
      },
      {
        test:    /\.(png|jpg|jpeg)$/,
        exclude: /node_modules/,
        loader:  'url-loader?limit=8192'  // inline it if under 8k
      },
      {
        test:    /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader:  'url-loader?limit=2048'  // inline it if under 2k
      }
    ]
  },

  postcss: [ autoprefixer( { browsers: ['last 2 versions'] } ) ],

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index-template.html',
      inject:   'body',
      filename: 'index.html'
    }),

    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    })
  ]
};
