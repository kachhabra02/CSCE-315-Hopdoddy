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
    // Get necessary info from request
    if (!req.query.startTime) {
        res.status(400).send("Must provide start time (startTime)!");
        return;
    }

    if (!req.query.endTime) {
        res.status(400).send("Must provide end time (endTime)!");
        return;
    }

    if (!req.query.limit) {
        res.status(400).send("Must provide limit!");
        return;
    }

    // Send query
    const queryObj = {
        text: queries.getPopularPairsQuery,
        values: [req.query.startTime, req.query.endTime, req.query.limit]
    };

    const client = await pool.connect();
    const result = await client.query(queryObj, (error, results) => {
        if(error) {
            res.status(400).send("Error sending query: " + error.message);
            return;
        }

        res.status(200).json(results.rows);
    });
    client.release();
});


/***** /api/reports/sales *****/
// Generate sales report
router.get('/sales', async (req, res) => {
    // Get necessary info from request
    if (!req.query.startTime) {
        res.status(400).send("Must provide start time (startTime)!");
        return;
    }

    if (!req.query.endTime) {
        res.status(400).send("Must provide end time (endTime)!");
        return;
    }

    // Send query
    const queryObj = {
        text: queries.getSalesReportQuery,
        values: [req.query.startTime, req.query.endTime]
    };

    const client = await pool.connect();
    const result = await client.query(queryObj, (error, results) => {
        if(error) {
            res.status(400).send("Error sending query: " + error.message);
            return;
        }

        res.status(200).json(results.rows);
    });
    client.release();
});


/***** /api/reports/excess *****/
// Generate excess report
router.get('/excess', async (req, res) => {
    // Get necessary info from request
    if (!req.query.startTime) {
        res.status(400).send("Must provide start time (startTime)!");
        return;
    }

    // Send query
    const queryObj = {
        text: queries.getExcessReportQuery,
        values: [req.query.startTime]
    };

    const client = await pool.connect();
    const result = await client.query(queryObj, (error, results) => {
        if(error) {
            res.status(400).send("Error sending query: " + error.message);
            return;
        }

        res.status(200).json(results.rows);
    });
    client.release();
});


/***** /api/reports/restock *****/
// Generate restock report
router.get('/restock', async (req, res) => {
    // Send query
    const queryObj = {
        text: queries.getRestockReportQuery,
        values: []
    };

    const client = await pool.connect();
    const result = await client.query(queryObj, (error, results) => {
        if(error) {
            res.status(400).send("Error sending query: " + error.message);
            return;
        }

        res.status(200).json(results.rows);
    });
    client.release();
});


/***** /api/reports/product-usage *****/
// Generate product usage report
router.get('/product-usage', async (req, res) => {
    // Get necessary info from request
    if (!req.query.startTime) {
        res.status(400).send("Must provide start time (startTime)!");
        return;
    }

    if (!req.query.endTime) {
        res.status(400).send("Must provide end time (endTime)!");
        return;
    }

    // Send query
    const queryObj = {
        text: queries.getProductUsageQuery,
        values: [req.query.startTime, req.query.endTime]
    };

    const client = await pool.connect();
    const result = await client.query(queryObj, (error, results) => {
        if(error) {
            res.status(400).send("Error sending query: " + error.message);
            return;
        }

        res.status(200).json(results.rows);
    });
    client.release();
});


// Export URI router
module.exports = router