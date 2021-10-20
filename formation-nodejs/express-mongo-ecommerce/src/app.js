// Crée par Joachim Zadi le 30/04/2020 à 18:41
// ===========================================
const express = require("express");
const morgan = require("morgan");
const UserRouter = require("./routes/UsersRoute");
const EnseigneRouter = require("./routes/EnseigneRoute");
const ProduitRouter = require("./routes/ProduitRoute");
const GlobalError = require("./controllers/ErrorsController");
const AppError = require("./utils/AppError");
const protect = require("./controllers/AuthController").protect;

require("dotenv").config();
require("./config/MongoConfig");

const app = express();

/*MIDDLEWARES*/
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

/*ROUTES*/
app.use("/api/users", UserRouter);
app.use("/api/enseignes", protect, EnseigneRouter);
app.use("/api/produits", protect, ProduitRouter);

/*GESTION DES ROUTES NON GEREES*/
app.all("*", (req, res, next) => {
    next(new AppError(`La requete d'URL ${req.originalUrl} ne peut être resolu par ce serveur !!!`, 404));
});

app.use(GlobalError);

module.exports = app;
