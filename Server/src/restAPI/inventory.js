// Necessary requirements
const express = require('express')
const router = express.Router()

// Retrieve connection pool
const pool = require('./db');

// Import SQL queries
const queries = require('./queries');

/***** /api/inventory *****/
// View inventory
router.get('/', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
    res.send("View inventory");
});

// Add inventory item
router.post('/', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
    res.send("Add inventory item");
});


/***** /api/inventory/:id *****/
// Update inventory item
router.put('/:id', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
    res.send("Update inventory item");
});

// Delete inventory item
router.delete('/:id', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
    res.send("Delete inventory item");
});


// Export URI router
module.exports = router