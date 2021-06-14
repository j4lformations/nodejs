// Mongoose est un outil permettant de modélisation d'objets MongoDB
const mongoose = require('mongoose');

// Un module externe nodejs permettant de valider les champs d'un objet
const validator = require('validator');

// Un module externe nodejs permettant de hacher les mots de passe.
const bcrypt = require('bcryptjs');

// Un Module interne nodejs permettant d'activer la prise el charge de la crypto
const crypto = require('crypto');

const {v4: uuidv1} = require('uuid');

// Un module externe nodejs permettant de capitaliser une chaine de caracteres.
const {capitalCase} = require('capital-case');

// Pluging mongoose permettant de generer les messages de violation de la contraint unique sur un champ
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

// creation duSchema User
const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please tell us your name !!!'],
        maxlength: 25,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please tell us your email !!!'],
        unique: "The email address << {VALUE} >> already exists",
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please tell us your password !!!'],
        minlength: 6,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password !!!'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same !'
        }
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    about: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'employe'],
        default: 'user'
    },
    history: {
        type: Array,
        default: []
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
}, {timestamps: true});

// Fonction de rappel avant une persistence permettant de capitaliser le champ name
UserSchema.pre('save', async function (next) {
    this.name = await capitalCase(this.name);
    next();
});

// Fonction de rappel avant une persistence permettant hasher le champ password
UserSchema.pre('save', async function (next) {
    // Si le password existe deja et n'a pas ete modifié
    if (!this.isModified('password'))
        return next();

    // Sinon, on hashe le mot de passe
    this.password = await bcrypt.hash(this.password, 12);

    // On desactive la persitence du champ passwordConfirm
    this.passwordConfirm = undefined;
    next();
});

// Fonction de rappel avant une persistence permettant renseigner le champ passwordChangedAt
UserSchema.pre('save', async function (next) {
    // Si le champ password n'a pas subit de modification
    if (!this.isModified('password') || this.isNew)
        return next();

    // Sinon, on met à jour le champ passwordChangedAt
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// Fonction de rappel avant une selection permettant de ne selectionner que les Users actifs
UserSchema.pre("/^find/", function (next) {
    this.find({active: {$ne: false}});
    next();
})

UserSchema.methods = {

    // Permet de verifier la conformité des mots de passes
    correctPassword: async function (candidatePassord, userPassword) {
        return await bcrypt.compare(candidatePassord, userPassword);
    },

    // Permet de detecter si le mot de passe a été changé eventuellement
    changedPasswordAfter: function (JWTTimestamp) {
        // Si le mot de passe change
        if (this.passwordChangedAt) {
            const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
            return JWTTimestamp < changedTimestamp;
        }

        // Sinon
        return false;
    },

    // Permet de generer un nouveau token en cas de changement de mot de passe
    createPasswordResetToken: function () {
        // On cree le token
        const resetTohen = crypto.randomBytes(32).toString('hex');

        // On le hache
        this.passwordResetToken = crypto
            .createHash('sha256')
            .update(resetTohen)
            .digest('hex');

        console.log({resetTohen}, this.passwordResetToken);

        // On met a jour la date d'expiration du token
        this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
        return resetTohen;
    }
}

UserSchema.plugin(beautifyUnique);

const User = mongoose.model("User", UserSchema);
module.exports = User;
