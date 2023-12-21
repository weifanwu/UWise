var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connect = require('./models/models.js');
var google = require('./routes/auth/google');
var redis = require('./routes/database/redis');
var lecture = require('./routes/class/lecture.js');
var staticResources = require('./routes/resources/staticResources.js');
// var dynamicResources = require('./routes/resources/dynamicResources.js');

require('dotenv').config()
const cors = require('cors');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_HOST, process.env.INTERAL_HOST],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
    maxAge: 3600,
  })
);

app.use(async (req, res, next) => {
  await connect();
  next();
});

app.use('/auth', google);
app.use('/buy', redis);
app.use('/lecture', lecture);
// app.use('/dr', dynamicResources);
app.use('/resources', staticResources);
app.get('/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: "successfull",
    user: req.user,
  })});

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