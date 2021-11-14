const express = require("express");
const app = express();
const users = require('./users');

app.use('/users', users);
app.use('/forget', require('./forget'));

module.exports = app;