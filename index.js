/*eslint-disable*/
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const https = require('https');

const PORT = process.env.PORT

app.use(express.json());
app.use(logger('dev'));
app.use(cors());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const options = {
  key: fs.readFileSync(__dirname + '/../.certification/key.pem'),
  cert: fs.readFileSync(__dirname + '/../.certification/cert.pem'),
};

const server = https.createServer(options, app).listen(PORT);

module.exports = server;
