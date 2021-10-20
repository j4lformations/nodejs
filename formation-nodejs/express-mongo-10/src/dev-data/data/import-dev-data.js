// Crée par Joachim Zadi le 23/04/2020 à 14:41
// ===========================================
const fs = require("fs");
require("dotenv").config();
require("../../config/database");
const Tour = require("../../models/tourModel");

/*LECTURE DES DONNEES EXEMPLES DEPUIS LE FICHIER JSON*/
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

/*EXPORT DES DONNEES DANS LA BASE DE DONN2ES MONGO*/
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("EXPORT DES DONNEES OK 👏");
    } catch (err) {
        console.error("ERREUR 🔥", err);
    }
    process.exit();
}

/*SUPPRESSION DES DONNEES EXEMPLES*/
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("SUPPRESSION DES DONNEES OK 👏");
    } catch (err) {
        console.error("ERREUR 🔥", err);
    }
    process.exit();
}

if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}
