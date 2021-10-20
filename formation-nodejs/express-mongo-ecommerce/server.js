// Crée par Joachim Zadi le 30/04/2020 à 18:41
// ===========================================
const app = require("./src/app");

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Requetes dispo sur le port ${port}`);
});

