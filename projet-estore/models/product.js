const mongoose = require('mongoose');
const slugify = require('slugify');
const {capitalCase} = require('capital-case');
const autoPopulate = require('mongoose-autopopulate')
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

// creation du Schema Product
const ProductSchema = new Schema({
        name: {
            type: String,
            trim: true,
            required: [true, 'Please tell us the product name !!!'],
            unique: "The name of product << {VALUE} >> already exists"
        },
        price: {
            type: Number,
            required: [true, 'Please tell us the product price !!!']
        },
        quantity: {
            type: Number,
            default: 100
        },
        description: {
            type: String,
            //required: [true, 'Please tell us the product description !!!'],
            maxlength: 2000
        },
        imageCover: {
            type: String,
            //required: [true, 'A product must have a cover image'],
            default: `${this.name}.jpg`
        },
        images: [String],
        shipping: {
            type: Boolean,
            required: false
        },
        slug: String,
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'Please tell us the product category !!!'],
            autopopulate: true
        },
        active: {
            type: Boolean,
            default: true,
            select: false
        }
    }, {
        timestamps: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

ProductSchema.pre('save', async function (next) {
    this.name = await capitalCase(this.name);
    next();
});

ProductSchema.pre('save', async function (next) {
    this.slug = await slugify(this.name, {lower: true});
    next();
});

ProductSchema.pre("/^find/", function (next) {
    this.find({active: {$ne: false}});
    next();
})

ProductSchema.plugin(beautifyUnique);

ProductSchema.plugin(autoPopulate);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
