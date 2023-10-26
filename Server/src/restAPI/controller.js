const pool = require('./db');
const queries = require('./queries');

const getCategories = (req, res) => {
    pool.query(queries.getCatQuery, (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
};

const getSubCategories = (req, res) => {
    const category = req.params.Category;
    pool.query(queries.getSubCategoriesQuery,[category],(error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
};
module.exports = {
    getCategories,
    getSubCategories,
};