const getCatQuery = "SELECT DISTINCT Category FROM Menu WHERE Is_Modification=FALSE AND Is_Available ORDER BY Category ASC";
const getSubCategoriesQuery = "SELECT DISTINCT Sub_Category FROM Menu WHERE Category= $1 AND Is_Available ORDER BY Sub_Category ASC";
module.exports = {
    getCatQuery,
    getSubCategoriesQuery,
};