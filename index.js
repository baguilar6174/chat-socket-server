const express = require('express');
const path = require('path');
require('dotenv').config();

// Database connection
const { dbConnection } = require('./databse/config');
dbConnection();

// Express App
const app = express();

// Config read boby information
app.use(express.json());


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


// public path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Routes config
app.use('/api/v1/auth/signup', require('./routes/auth'));


server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Server running`, process.env.PORT);
});