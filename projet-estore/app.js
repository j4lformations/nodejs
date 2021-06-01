
const express = require("express");
const authRouter = require("./routes/auth");
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

// middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authRouter);

module.exports = app;