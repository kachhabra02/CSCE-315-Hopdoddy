// Necessary requirements
const express = require('express')
const router = express.Router()

// Retrieve connection pool
const pool = require('./db');

// Import SQL queries
const queries = require('./queries');


/***** /api/reports/popular-pairs *****/
// Generate "What Sells Together?" report
router.get('/popular-pairs', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
    res.send("Generate \"What Sells Together?\" report");
});


/***** /api/reports/sales *****/
// Generate sales report
router.get('/sales', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
    res.send("Generate sales report");
});


/***** /api/reports/excess *****/
// Generate excess report
router.get('/excess', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
    res.send("Generate excess report");
});


/***** /api/reports/restock *****/
// Generate restock report
router.get('/restock', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
    res.send("Generate restock report");
});


/***** /api/reports/product-usage *****/
// Generate product usage report
router.get('/product-usage', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
    res.send("Generate product usage report");
});


// Export URI router
module.exports = router