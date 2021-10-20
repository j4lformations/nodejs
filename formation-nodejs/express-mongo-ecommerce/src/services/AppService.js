// Crée par Joachim Zadi le 08/05/2020 à 16:59
// ===========================================

class AppService {
    capitilize(mots) {
        return mots
            .toLowerCase()
            .split(' ')
            .map(mot => {
                return mot.charAt(0).toUpperCase() + mot.slice(1)
            })
            .join(' ');
    }
}

module.exports = new AppService();