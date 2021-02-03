require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const https = require('https');

const router = require('./routes');

const PORT = process.env.PORT;

app.use(express.json());
app.use(logger('dev'));
app.use(
  cors({
    origin: ['https://www.kudapach.com'],
    method: ['GET', 'POST'],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.post('/', (req, res) => res.status(200).send('hey'));
app.get('/', (req, res) => res.status(200).send('ok'));

const options = {
  key: fs.readFileSync(__dirname + '/../.certification/key.pem', 'utf-8'),
  cert: fs.readFileSync(__dirname + '/../.certification/cert.pem', 'utf-8'),
};

const server = https.createServer(options, app).listen(PORT);

module.exports = server;
