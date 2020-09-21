var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');

var indexRouter = require('./routes/index');

var appHomeRouter = require('./routes/appHome');
var trendingChartRouter = require('./routes/trendingChart');

var homeRouter = require('./routes/home');
var worldRouter = require('./routes/world');
var politicsRouter = require('./routes/politics');
var businessRouter = require('./routes/business');
var technologyRouter = require('./routes/technology');
var sportsRouter = require('./routes/sports');
var scienceRouter = require('./routes/science');
var bigCardRouter = require('./routes/bigCard');
var searchQueryRouter = require('./routes/searchQuery');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/appHome', appHomeRouter);
app.use('/trendingChart', trendingChartRouter);

app.use('/home', homeRouter);
app.use('/world', worldRouter);
app.use('/politics', politicsRouter);
app.use('/business', businessRouter);
app.use('/technology', technologyRouter);
app.use('/sports', sportsRouter);
app.use('/science', scienceRouter);
app.use('/bigCard', bigCardRouter);
app.use('/searchQuery',searchQueryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;