const mongoose = require('mongoose');
const crypto = require('crypto');
const {v4: uuidv1} = require('uuid');

const Schema = mongoose.Schema;

// creation du UserSchema
const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 25
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
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

UserSchema.methods = {
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

module.exports = mongoose.model("User", UserSchema);
