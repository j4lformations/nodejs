const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const {errorHandler} = require('../utils/dbErrorHandler');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimeType.startsWith('image')) {
        cb(null, true);
    } else {
        const error = [{
            "message": 'Not an image! Please upload only images.'
        }]
        cb(errorHandler(error));
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(
        el => {
            if (allowedFields.includes(el)) {
                newObj[el] = obj[el];
            }
        }
    );
    return newObj;
}

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
    try {
        if (!req.file) {
            next();
        }
        req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({quality: 90})
            .toFile(`public/img/users/${req.file.filename}`);
        next();
    } catch (error) {
        next(errorHandler(error));
    }
};

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.updateMe = async (req, res) => {
    try {
        // Noms de champs qui ne sont pas autorisés à être mis à jour
        const filteredBody = filterObj(req.body, 'name', 'email');
        if (req.file) {
            filteredBody.photo = req.file.filename;
        }

        // Mettre à jour le document user
        const updateUser = await User.findOneAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
        });

        await res
            .status(200)
            .json(updateUser);
    } catch (error) {
        await res
            .status(400)
            .json(errorHandler(error));
    }
};

exports.deleteMe = async (req, res) => {
    await User.findByIdAndUpdate(req.user.id, {active: false});
    await res
        .status(204)
        .json(null);
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            const error = [{message: `No User found with in System`}]
            return await res
                .status(400)
                .json(errorHandler(error));
        }
        await res
            .status(200)
            .json(users);
    } catch (error) {
        await res.status(400).json(errorHandler(error));
    }
};

exports.getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            const error = [{message: `No User found with that ${req.params.id}`}]
            return await res
                .status(400)
                .json(errorHandler(error));
        }
        await res
            .status(200)
            .json(user);
    } catch (error) {
        await res
            .status(400)
            .json(errorHandler(error));
    }
};

exports.createUser = async (req, res) => {
    try {
        const {name, email, password, passwordConfirm, role} = await req.body;
        let newUser = new User({
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            role: role
        });
        newUser = await newUser.save();
        newUser.password = undefined;

        await res
            .status(200)
            .json(newUser);
    } catch (error) {
        await res
            .status(401)
            .json(errorHandler(error));
    }
}

