// Crée par Joachim Zadi le 14/04/2020 à 09:19
// ===========================================

const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

moment.locale("fr");

/*CREATION DU SCHEMA MESSAGE*/
const MessageSchema = new Schema({
    title: {
        type: String,
        required: [true, "Le titre du message est requis"]
    },
    content: {
        type: String,
        required: [true, "Le contenu du message est requis"]
    },
    user: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: new Date()
    }
});

MessageSchema.virtual('dateAt').get(function() {
    return moment(this.createAt).fromNow();
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;