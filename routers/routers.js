const express = require("express");
const app = express();
const users = require('./users');
const forgetPass = require('./forget');
const support = require('./support');
const pricing = require('./pricing');

app.use('/users', users);
app.use('/forget', forgetPass);
app.use('/support', support);
app.use('/pricing', pricing);

module.exports = app;