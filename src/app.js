const express = require('express');
var logger = require('morgan');
const path = require('path');
const cors = require('cors');

// Local variables .env
require('dotenv').config();

// Database connection
const { dbConnection } = require('./databse/config');
dbConnection();

// Express App
const app = express();

// cors configuration
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

/// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// morgan config
(app.get('env') !== 'production') && app.use(logger('dev'));

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// public path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// routes
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next({ resource: true });
});

// error handler
app.use(require('./middlewares/errorHandler'));


module.exports = app;