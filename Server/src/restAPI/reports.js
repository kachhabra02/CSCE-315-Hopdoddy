// Necessary requirements
const express = require('express')
const router = express.Router()

// Retrieve connection pool
const pool = require('./db');


/***** /api/reports/popular-pairs *****/
// Generate "What Sells Together?" report
router.get('/popular-pairs', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


/***** /api/reports/sales *****/
// Generate sales report
router.get('/sales', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


/***** /api/reports/excess *****/
// Generate excess report
router.get('/excess', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


/***** /api/reports/restock *****/
// Generate restock report
router.get('/restock', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


/***** /api/reports/product-usage *****/
// Generate product usage report
router.get('/product-usage', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


// Export URI router
module.exports = router