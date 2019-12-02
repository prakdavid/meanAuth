var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect(
  'mongodb+srv://learnangular:devtoto42@cluster0-pt1nh.gcp.mongodb.net/learnangular?retryWrites=true&w=majority',
  {},
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('connection OK');
    }
  }
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})
module.exports = app;
