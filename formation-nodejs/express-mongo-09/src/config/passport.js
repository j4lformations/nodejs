// Crée par Joachim Zadi le 15/04/2020 à 15:58
// ===========================================

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

module.exports = async (passport) => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'mdp'
        },
        async function (email, mdp, done) {
            try {
                //Recherche du User
                let user = await User.findOne({email: email});

                //User non trouvé
                if (!user) {
                    return done(null, false, {message: `Aucun user n'utilise l'email "${email}"`});
                }
                //User non trouvé
                if (!user) {
                    return done(null, false, {message: `Aucun user n'utilise l'email "${email}"`});
                }

                //User trouvé
                await validPassword(user, mdp, done);
            } catch
                (err) {
                console.error(err);
            }
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

/*FONCTION DE VALIDATION DE MOT DE PASSE*/
const validPassword = async (user, mdp, done) => {
    try {
        let isMatch = await bcrypt.compare(mdp, user.mdp);
        if (!isMatch) {
            //Le mot de passe ne correspond pas
            return done(null, false, {message: 'Le mot de passe est incorrecte.'});
        } else {
            //Le mot de passe correspond
            return done(null, user);
        }
    } catch (e) {
        console.error(e);
    }
}