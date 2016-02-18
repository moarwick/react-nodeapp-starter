'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackConfig = require('./webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// determine env, set appropriate port
/* eslint no-console: 0 */

// dependencies
var isDev = process.env.NODE_ENV !== 'production';

// dev related

var port = isDev ? 5858 : 80;

// set up Express
var app = (0, _express2.default)();

// settings when running locally (apply Webpack middleware)
if (isDev) {
  (function () {
    var compiler = (0, _webpack2.default)(_webpackConfig2.default);

    var middleware = (0, _webpackDevMiddleware2.default)(compiler, {
      publicPath: _webpackConfig2.default.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    });

    // apply webpack middleware
    app.use(middleware);
    app.use((0, _webpackHotMiddleware2.default)(compiler));

    app.get('*', function response(req, res) {
      res.write(middleware.fileSystem.readFileSync(_path2.default.join(__dirname, 'public/index.html')));
      res.end();
    });

    // settings when running on prod
  })();
} else {
    // serve static files
    app.use(_express2.default.static(__dirname + '/public'));

    // return index.html on any route
    app.get('*', function response(req, res) {
      res.sendFile(_path2.default.join(__dirname, 'public/index.html'));
    });
  }

// launch server
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Serving on port %s...', port);
});
