// Crée par Joachim Zadi le 16/04/2020 à 16:15
// ===========================================

/*IMPORT DU MODULE APP*/
const app = require("./src/app");

/*PORT DU D'ECOUTE DU SERVEUR*/
const port = process.env.PORT || 4500;

/*AFFECTION D'UN PORT D'ECOUTE AU SERVEUR*/
app.listen(port, () => {
    console.log(`Vos requetes sont en ecoutes sur le port ${port}`);
});

