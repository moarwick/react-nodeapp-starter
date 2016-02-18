/* eslint no-console: 0 */

// dependencies
import path from 'path';
import webpack from 'webpack';
import express from 'express';

// dev related
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

// determine env, set appropriate port
const isDev = process.env.NODE_ENV !== 'production';
const port  = isDev ? 5858 : 80;

// set up Express
var app = express();

// settings when running locally (apply Webpack middleware)
if (isDev) {
  const compiler = webpack( config );

  const middleware = webpackMiddleware( compiler, {
    publicPath:  config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors:       true,
      hash:         false,
      timings:      true,
      chunks:       false,
      chunkModules: false,
      modules:      false
    }
  });

  // apply webpack middleware
  app.use( middleware );
  app.use( webpackHotMiddleware( compiler ) );

  app.get( '*', function response( req, res ) {
    res.write( middleware.fileSystem.readFileSync( path.join( __dirname, 'public/index.html') ) );
    res.end();
  });

// settings when running on prod
} else {
  // serve static files
  app.use( express.static( __dirname + '/public' ) );

  // return index.html on any route
  app.get( '*', function response( req, res ) {
    res.sendFile( path.join( __dirname, 'public/index.html' ) );
  });
}

// launch server
app.listen( port, '0.0.0.0', function onStart( err ) {
  if (err) { console.log( err ); }
  console.info( 'Serving on port %s...', port );
});
