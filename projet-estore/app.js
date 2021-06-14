const express = require("express");
const path = require("path");
const pup = require("pug");
const cors = require("cors");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// le fichier .env
require("dotenv").config();

// le serveur express
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// le server de bdd
require("./config/database")

// middlewares
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get("/", (req, res) => {
    res.render("base", {
        product: "Node JS",
        user: "Joachim"
    });
});

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

module.exports = app;