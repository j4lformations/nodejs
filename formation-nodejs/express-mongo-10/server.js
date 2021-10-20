// Crée par Joachim Zadi le 23/04/2020 à 10:10
// ===========================================
const app = require("./src/app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Requetes disponible sur le port ${PORT}`);
});