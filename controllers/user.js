const User = require('../models/user');

exports.formRegsiter = (req, res) => {
    res
        .status(200)
        .json({
            msg: "Un bonjour depuis le controlleur user"
        });
}

exports.postFormRegsiter = async (req, res) => {

    //console.log('req.body', req.body);
    let user = await new User(req.body);
    //console.log(user);
    await user.save().then(user => {
        return res
            .status(400)
            .json(user);
    }).catch(error => {
            return res
                .status(400)
                .json(error);
        }
    );
}