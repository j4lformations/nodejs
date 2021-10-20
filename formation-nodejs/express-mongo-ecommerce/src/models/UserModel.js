// Crée par Joachim Zadi le 30/04/2020 à 19:22
// ===========================================
const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require('bcryptjs');
const AppService = require("../services/AppService");

const UserSchema = new Schema(
    {
        prenom: {
            type: String,
            required: [true, "Renseignez votre prénom s'il vous plait"]
        },
        email: {
            type: String,
            required: [true, "Renseignez votre adresse email s'il vous plait"],
            unique: [true, "Cette adresse email est deja utilisée"],
            lowercase: true,
            validate: [validator.isEmail, "L'adresse email doit etre au format @domaine.com"]
        },
        photo: {
            type: String
        },
        role: {
            type: String,
            enum: ["Client", "Admin"],
            default: "Client"
        },
        password: {
            type: String,
            required: [true, "Renseignez votre mot de passe s'il vous plait"],
            minlength: 8,
            select: false
        },
        passwordConfirmed: {
            type: String,
            required: [true, "Confirmez votre mot de passe s'il vous plait"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Les mots de passes ne concordent pas !!!"
            }
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false
        }
    },

    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        timestamps: true
    });

UserSchema.pre("save", async function (next) {
    this.prenom = AppService.capitilize(this.prenom);
    this.role = AppService.capitilize(this.role);
    next();
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirmed = undefined;
    next();
});

UserSchema.pre(/^find/, function (next) {
    this.select('-__v -createdAt -updatedAt');
    next();
});

UserSchema.methods.isValidPassword = async function (cadidatePassword, userPassword) {
    return await bcrypt.compare(cadidatePassword, userPassword);
}

UserSchema.methods.isChangedPasswordAfter = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.changedPasswordAfter.getTime() / 1000, 10);
        // console.log(this.passwordChangedAt, JWTTimestamp);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}

UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};
module.exports = mongoose.model("User", UserSchema);
