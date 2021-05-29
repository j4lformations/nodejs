const express = require("express");
const userRouter = require("./routes/user");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// le fichier .env
require("dotenv").config();

// le serveur express
const app = express();

// le server de bdd
require("./config/database")

// middleware morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// middleware body-parser
app.use(bodyParser.json());

// middleware cookie-parser
app.use(cookieParser());

// middelware des routes
app.use('/api', userRouter);

module.exports = app;