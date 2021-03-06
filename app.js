var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./app.config.js');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var expressMongoDb = require('express-mongo-db');

var testProxy = require('./routes/test');
var webpackMiddleware = require("webpack-dev-middleware");
var app = express();

app.use(expressMongoDb(config.db));

app.get('/', function (req, res, next) {
  console.log(req.db)
  next()
});

// webpack
if(config.expressMiddleWare){
  app.use(webpackMiddleware(webpack(webpackConfig),{
    noInfo: false
  }));
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', testProxy);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`Error ${err.status}:${err.message}`);
});

module.exports = app;
