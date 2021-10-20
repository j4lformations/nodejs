// Crée par Joachim Zadi le 20/04/2020 à 16:06
// ===========================================
const app = require("./src/app");
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Requetes disponible sur le port ${PORT}`);
});


