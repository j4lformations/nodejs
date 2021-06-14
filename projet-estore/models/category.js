const mongoose = require('mongoose');
const {capitalCase} = require('capital-case');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

// creation du Schema Category
const CategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please tell us your name !!!'],
        maxlength: 35,
        unique: "The name of product << {VALUE} >> already exists"
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
}, {timestamps: true});

CategorySchema.pre('save', async function (next) {
    this.name = await capitalCase(this.name);
    next();
});

CategorySchema.pre("/^find/", function (next) {
    this.find({active: {$ne: false}});
    next();
});

CategorySchema.plugin(beautifyUnique);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
