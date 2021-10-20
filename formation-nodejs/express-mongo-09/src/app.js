// Crée par Joachim Zadi le 13/04/2020 à 19:23
// ===========================================

/*IMPORTS DES MODULES DU PROJET*/
const express = require("express");
const hbs = require('hbs');
const path = require("path");
const methodOverride = require('method-override')
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
require('dotenv').config();


/*INSTANCE DU SERVEUR*/
const app = express();

/*CONNEXION AU SERVEUR MONGO*/
require("./config/database");

/*MIDDLEWARE DE SURCHARGE DES VERBES HTTP*/
app.use(methodOverride('_method'));

/*MIDDLEWARE DE PRISE EN CHARGE EXPRESS SESSION*/
app.use(session({
    secret: 'Stage avec J4l',
    resave: true,
    saveUninitialized: true
}));

/*MIDDLEWARE DU MODULE PASSPORT*/
app.use(passport.initialize());
app.use(passport.session());

/*MIDDLEWARE DE PRISE EN CHARGE DE CONNECT-FLASH*/
app.use(flash());

/*MIDDLEWARE DE DECLARATION DES VARIABLES GLOBALES*/
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
})

/*MIDDLEWARE BODY PARSER*/
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/*MIDDLEWARE HBS*/
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(__dirname + '/views/partials', function (err) {
    if (err) {
        throw err
    } else {
        return {_navbar: "_navbar", _errors: "_errors", _msg: "_msg"}
    }
});

/*MIDDLEWARE FOURNISSEUR DES FICHIERS STATICS*/
app.use(express.static(path.join(__dirname, "public")));

/*ROUTE INDEX*/
app.get("/", (req, res) => {
    let titre = "Accueil";
    res.render("index", {
        titre: titre
    });
});

/*CHARGEMENT DES ROUTES*/
const messagesRouter = require("./routes/messages");
const usersRouter = require("./routes/users");

/*CONFIGURATION DU MODULE PASSPORT*/
require("./config/passport")(passport);

/*CHARGEMENT DU MODULE DE PROTECTION DES ROUTES*/
const {protection} = require("./config/auth");

/*MIDDLEWARE DE ROUTAGE*/
app.use("/msg", protection, messagesRouter);
app.use("/users", usersRouter);

/*EXPORT DE APP SOUS FORM DE MODULE*/
module.exports = app;
