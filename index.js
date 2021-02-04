require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const router = require('./routes');

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

// app.use('/', router);

app.post('/', (req, res) => res.status(200).send('hey'));
app.get('/', (req, res) => res.status(200).send('ok'));

app.listen(PORT);
module.exports = app;
