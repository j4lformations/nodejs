// Crée par Joachim Zadi le 13/05/2020 à 18:25
// ===========================================
const nodemailer = require("nodemailer");
const catchAsync = require("./CatchAsync");

const sendEmail = catchAsync(async (options) => {
    //1==> On cree le transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // vrai pour le port 465, faux pour les autres ports
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    //2==> On definie les options d'envoi
    const mailOptions = {
        from: "Joachim Zadi <joachim@j4l.io>", // expediteur
        to: options.email, // Liste des recepteurs
        subject: options.subject, // Sujet
        // text: options.message, // Message du mail
        html: options.message // html body
    }

    //3==> On envoie le mail avec nodemailer
    await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;