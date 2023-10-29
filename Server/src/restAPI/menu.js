// Necessary requirements
const express = require('express')
const router = express.Router()

// Retrieve connection pool
const pool = require('./db');

// Import SQL queries
const queries = require('./queries');


/***** /api/menu *****/
// Add a menu item
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


/***** /api/menu/item/:id *****/
// Update menu item
router.put('/item/:id', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});

// Delete menu item
router.delete('/item/:id', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


/***** /api/menu/categories *****/
// Get categories
router.get('/categories', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


/***** /api/menu/sub-categories *****/
// Get subcategories
router.get('/sub-categories', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


/***** /api/menu/items *****/
// Get menu items
router.get('/items', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


/***** /api/menu/modifications *****/
// Get modifications
router.get('/modifications', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


/***** /api/menu/view *****/
// View entire menu
router.get('/view', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
});


// Export URI router
module.exports = router