// Necessary requirements
const express = require('express')
const router = express.Router()

// Retrieve connection pool
const pool = require('./db');


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
});

// Get order history
router.get('/', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


// Export URI router
module.exports = router