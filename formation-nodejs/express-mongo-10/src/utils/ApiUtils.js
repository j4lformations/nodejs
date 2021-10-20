// Crée par Joachim Zadi le 24/04/2020 à 17:29
// ===========================================

class ApiUtils {
    queryString;
    query;

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    /**
     *
     * @returns {ApiUtils}
     */
    filter() {

        const queryObj = {...this.queryString};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(elt => delete queryObj[elt]);

        /*ON PARSE LES OPERATEURS DE COMPARAISON*/
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        queryStr = JSON.parse(queryStr);
        let query = this.query.find(queryStr);
        return this;
    }

    /**
     *
     * @returns {ApiUtils}
     */
    sort() {
        /*PRISE EN CHARGE DU TRI*/
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }

    /**
     *
     * @returns {ApiUtils}
     */
    limitFields() {
        /*LIMITER L'AFFICHAGE*/
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__V");
        }
        return this;
    }

    /**
     *
     * @returns {ApiUtils}
     */
    paginate() {
        /*PAGINATION*/
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = ApiUtils;
