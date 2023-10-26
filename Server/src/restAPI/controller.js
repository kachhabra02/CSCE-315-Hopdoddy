const pool = require('./db');

const getCategories = (req, res) => {
    pool.query("SELECT DISTINCT Category FROM Menu WHERE Is_Modification=FALSE AND Is_Available ORDER BY Category ASC", (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
};

module.exports = {
    getCategories,
};