// Crée par Joachim Zadi le 23/04/2020 à 11:02
// ===========================================
const mongoose = require("mongoose");
const slugify = require('slugify');
const Schema = mongoose.Schema;

const TourSchema = new Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: [true],
        trim: true
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, "A tour must have a duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a group size"]
    },
    difficulty: {
        type: String,
        required: [true, "A tour must have difficulty level"],
        trim: true
    },
    ratingsAverage: {
        type: Number,
        default: 3.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: [true, "A tour must have a description"]
    },
    imageCover: {
        type: String,
        trim: true,
        required: [true, "A tour must have a cover image"]
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

/*PROPRIETE VIRTUELLE*/
TourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});

/*DOCUMENT MIDDLEWARE : SE DECLANCHE AVANT LES METHODES SAVE ET CREATE*/
TourSchema.pre('save', async function (next) {
    // console.log(this);
    this.slug = await slugify(this.name, {lower: true});
    next();
});

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
TourSchema.pre(/^find/, function (next) {
    this.find({secretTour: {$ne: true}});

    this.start = Date.now();
    next();
});

// AGGREGATION MIDDLEWARE
TourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({$match: {secretTour: {$ne: true}}});

    console.log(this.pipeline());
    next();
});

TourSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    next();
});


const Tour = mongoose.model("Tour", TourSchema);
module.exports = Tour;
