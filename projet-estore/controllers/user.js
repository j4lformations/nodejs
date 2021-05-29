const User = require('../models/user');

exports.formRegsiter = async (req, res) => {
    await res
        .status(200)
        .json({
            msg: "Affichage du formulaire Register"
        });
}

exports.postFormRegsiter = async (req, res) => {
    let user = await new User(req.body);
    await user.save()
        .then(user => {
            return res
                .status(200)
                .json(user);
        })
        .catch(error => {
                return res
                    .status(400)
                    .json(error);
            }
        );
}

exports.formLogin = async (req, res) => {
    await res
        .status(200)
        .json({
            msg: "Affichage du formulaire Login"
        });
}

exports.postFormLogin = async (req, res) => {
    await res
        .status(200)
        .json({
            msg: "Affichage du formulaire Login"
        });
}