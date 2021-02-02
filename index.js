/*eslint-disable*/
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const https = require('https');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(logger('dev'));
app.use(cors());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const options = {};

const server = https.createServer(options, app).listen(PORT);

module.exports = server;
