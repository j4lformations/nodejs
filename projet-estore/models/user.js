const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const {v4: uuidv1} = require('uuid');
const {capitalCase} = require('capital-case');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

// creation du UserSchema
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
    hashed_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {timestamps: true});

// les champs virtuels
UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptedPassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.pre('save', async function (next) {
    this.name = await capitalCase(this.name);
    next();
});

UserSchema.methods = {

    authenticate: function (plainText) {
        return this.encryptedPassword(plainText) === this.hashed_password;
    },

    encryptedPassword: function (password) {
        if (!password) {
            return '';
        }
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (e) {
            return '';
        }
    }
}

UserSchema.plugin(beautifyUnique);

module.exports = mongoose.model("User", UserSchema);
