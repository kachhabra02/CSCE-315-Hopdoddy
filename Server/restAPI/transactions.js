// Necessary requirements
const express = require('express')
const router = express.Router()

// Retrieve connection pool
const pool = require('./db');

// Import SQL queries
const queries = require('./queries');


/***** /api/transactions *****/
// Place a transaction
router.post('/', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        
        // TODO: Send queries
        
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }

      // TODO: Send response
      res.send("Place a transaction");
});

// Get order history
router.get('/', async (req, res) => {
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
        text: queries.getOrderHistoryQuery,
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


// Export URI router
module.exports = router