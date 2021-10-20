// Crée par Joachim Zadi le 23/04/2020 à 10:11
// ===========================================
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const toursRouter = require("./routes/toursRoute");
const usersRouter = require("./routes/usersRoute");

require("dotenv").config();
require("./config/database");

const app = express();

/*MIDDLEWARES*/
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;



