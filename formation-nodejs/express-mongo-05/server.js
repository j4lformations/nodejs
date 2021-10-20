//On importe le module app.js
const app = require("./src/app");
const port = 4500;

app.listen(port, () => {
    console.log(`Vos requetes sont en ecoutes sur le port ${port}`);
});