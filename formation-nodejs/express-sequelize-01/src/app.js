// Crée par Joachim Zadi le 09/05/2020 à 19:32
// ===========================================
const express = require("express");
const msgRouter = require("./routes/msgRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/seq", msgRouter);

module.exports = app;
