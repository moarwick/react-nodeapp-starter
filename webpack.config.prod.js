'use strict';

var path              = require('path');
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer      = require( 'autoprefixer' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = {
  entry: [
    path.join( __dirname, 'src/index.js' )
  ],

  output: {
    path:     path.join( __dirname, '/public/' ),
    filename: '[hash].min.js'
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
        loader:  ExtractTextPlugin.extract( 'style-loader', [
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ])
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
    new webpack.optimize.OccurenceOrderPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/index-template.html',
      inject:   'body',
      filename: 'index.html'
    }),

    new ExtractTextPlugin( '[hash].min.css', { allChunks: true } ),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
    }),

    new webpack.optimize.UglifyJsPlugin({
      minimize:   true,
      compressor: { warnings: false },
      mangle:     { except:   [ 'exports', 'require' ] }
    })
  ]
};
