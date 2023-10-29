// Necessary requirements
const express = require('express')
const router = express.Router()

// Retrieve connection pool
const pool = require('./db');

// Place a transaction
router.put('/', async (req, res) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        
        // TODO
        
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
});

// Get order history
router.get('/', async (req, res) => {
    const client = await pool.connect();

    // TODO

    client.release();
});

// Export URI router
module.exports = router