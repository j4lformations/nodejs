// Crée par Joachim Zadi le 15/04/2020 à 17:50
// ===========================================

module.exports = {
    protection: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "Vous n'avez pas les autoristations nécessaires pour acceder à cette ressource");
        res.redirect("/users/login");
    }
}
