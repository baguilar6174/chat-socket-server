const express = require('express');
const app = express();

const testRouter = require('./test');
const projectRouter = require('./project');

app.use('/test', testRouter);
app.use('/api/v1', projectRouter);


module.exports = app; 