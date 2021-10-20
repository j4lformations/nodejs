// Crée par Joachim Zadi le 30/04/2020 à 20:13
// ===========================================
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
