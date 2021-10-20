// Crée par Joachim Zadi le 23/04/2020 à 10:49
// ===========================================
// const Tour = require("../models/tourModel");
// const ApiUtils = require("../utils/ApiUtils");

// exports.controller = {
//     getAllTours: async (req, res) => {
//         try {
//             // /*ON PREPARE LA REQUETE*/
//             // const queryObj = {...req.query};
//             // const excludedFields = ['page', 'sort', 'limit', 'fields'];
//             // excludedFields.forEach(elt => delete queryObj[elt]);
//             //
//             // /*ON PARSE LES OPERATEURS DE COMPARAISON*/
//             // let queryStr = JSON.stringify(queryObj);
//             // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//             // queryStr = JSON.parse(queryStr);
//             // //console.log(queryStr);
//             //
//             // let query = Tour.find(queryStr);
//
//             // /*PRISE EN CHARGE DU TRI*/
//             // if (req.query.sort) {
//             //     const sortBy = req.query.sort.split(",").join(" ");
//             //     // console.log(sortBy);
//             //     // query = query.sort(req.query.sort);
//             //     query = query.sort(sortBy);
//             // } else {
//             //     query = query.sort("-createdAt");
//             // }
//
//             // /*LIMITER L'AFFICHAGE*/
//             // if (req.query.fields) {
//             //     const fields = req.query.fields.split(",").join(" ");
//             //     query = query.select(fields);
//             // } else {
//             //     query = query.select("-__V");
//             // }
//
//             // /*PAGINATION*/
//             // const page = req.query.page * 1 || 1;
//             // const limit = req.query.limit * 1 || 100;
//             // const skip = (page - 1) * limit;
//             //
//             // query = query.skip(skip).limit(limit);
//
//             const features = new ApiUtils(Tour.find(), req.query)
//                 .limitFields()
//                 .sort()
//                 .filter()
//                 .paginate();
//
//             //ON EXECUTE LA REQUETE
//             const tours = await features.query;
//
//             //ON RENVOIE LA REPONSE
//             await res.status(200)
//                 .json({
//                     status: "success",
//                     result: tours.length,
//                     data: {
//                         tours
//                     }
//                 });
//         } catch (err) {
//             await res.status(404)
//                 .json({
//                         status: "fail",
//                         message: err
//                     }
//                 );
//         }
//     },
//
//     createTour: async (req, res) => {
//         try {
//             const tour = await Tour.create(req.body);
//             await res.status(201)
//                 .json({
//                     status: "success",
//                     data: tour
//                 });
//         } catch (err) {
//             await res.status(404)
//                 .json({
//                     status: "fail",
//                     message: err
//                 });
//         }
//     },
//
//     findTour: async (req, res) => {
//         try {
//             const tour = await Tour.findById(req.params.id);
//             await res.status(200)
//                 .json({
//                     status: "success",
//                     data: tour
//                 });
//         } catch (err) {
//             await res.status(404)
//                 .json({
//                     status: "fail",
//                     message: err
//                 });
//         }
//     },
//
//     updateTour: async (req, res) => {
//         try {
//             const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
//             await res.status(200)
//                 .json({
//                     status: "success",
//                     data: tour
//                 });
//         } catch (err) {
//             await res.status(404)
//                 .json({
//                     status: "fail",
//                     message: err
//                 });
//         }
//     },
//
//     deleteTour: async (req, res) => {
//         try {
//             await Tour.findByIdAndDelete(req.params.id);
//             await res.status(204)
//                 .json({
//                     status: "success",
//                     message: `La tour d'id "${req.params.id}" a été supprimée`
//                 });
//         } catch (err) {
//             await res.status(404)
//                 .json({
//                     status: "fail",
//                     message: err
//                 });
//         }
//
//     },
//
//     aliasTopTours: (req, res, next) => {
//         req.query.limit = '5';
//         req.query.sort = '-ratingsAverage,price';
//         req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//         next();
//     },
//
//     getTourStats: async (req, res) => {
//         try {
//             const stats = await Tour.aggregate([
//                 {
//                     $match: {ratingsAverage: {$gte: 4.5}}
//                 },
//                 {
//                     $group: {
//                         _id: {$toUpper: '$difficulty'},
//                         numTours: {$sum: 1},
//                         numRatings: {$sum: '$ratingsQuantity'},
//                         avgRating: {$avg: '$ratingsAverage'},
//                         avgPrice: {$avg: '$price'},
//                         minPrice: {$min: '$price'},
//                         maxPrice: {$max: '$price'}
//                     }
//                 },
//                 {
//                     $sort: {avgPrice: 1}
//                 }
//                 // {
//                 //   $match: { _id: { $ne: 'EASY' } }
//                 // }
//             ]);
//
//             await res.status(200).json({
//                 status: 'success',
//                 data: {
//                     stats
//                 }
//             });
//         } catch (err) {
//             await res.status(404).json({
//                 status: 'fail',
//                 message: err
//             });
//         }
//     },
// }

const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/ApiUtils');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});

exports.createTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
});

exports.updateTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
        {
            $match: {ratingsAverage: {$gte: 4.5}}
        },
        {
            $group: {
                _id: {$toUpper: '$difficulty'},
                numTours: {$sum: 1},
                numRatings: {$sum: '$ratingsQuantity'},
                avgRating: {$avg: '$ratingsAverage'},
                avgPrice: {$avg: '$price'},
                minPrice: {$min: '$price'},
                maxPrice: {$max: '$price'}
            }
        },
        {
            $sort: {avgPrice: 1}
        }
        // {
        //   $match: { _id: { $ne: 'EASY' } }
        // }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1; // 2021

    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: {$month: '$startDates'},
                numTourStarts: {$sum: 1},
                tours: {$push: '$name'}
            }
        },
        {
            $addFields: {month: '$_id'}
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: {numTourStarts: -1}
        },
        {
            $limit: 12
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            plan
        }
    });
});
