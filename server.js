/* eslint no-console: 0 */

var path    = require( 'path' );
var webpack = require( 'webpack' );
var express = require( 'express' );
var app     = express();

// local dev related
var webpackMiddleware    = require( 'webpack-dev-middleware' );
var webpackHotMiddleware = require( 'webpack-hot-middleware' );
var config               = require( './webpack.config.js' );

// determine env, set appropriate port
var isDev = process.env.NODE_ENV !== 'production';
var port  = isDev ? 8080 : 80;

// local dev
if (isDev) {
  var compiler = webpack( config );

  var middleware = webpackMiddleware( compiler, {
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

  app.use( middleware );
  app.use( webpackHotMiddleware( compiler ) );

  app.get( '*', function response( req, res ) {
    res.write( middleware.fileSystem.readFileSync( path.join( __dirname, 'public/index.html') ) );
    res.end();
  });

// prod env
} else {
  app.use( express.static( __dirname + '/public' ) );

  app.get( '*', function response( req, res ) {
    res.sendFile( path.join( __dirname, 'public/index.html' ) );
  });
}

// server
app.listen( port, '0.0.0.0', function onStart( err ) {
  if (err) { console.log( err ); }
  console.info( 'Serving on port %s...', port );
});
