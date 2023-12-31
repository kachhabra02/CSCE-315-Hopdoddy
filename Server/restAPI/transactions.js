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
    // Get necessary info from request
    const emp_email = (req.body.email) ? req.body.email : "iamacustomer@kiosk.com";
    // if (!req.body.email) {
    //     res.status(400).send("Must provide employee email (email)!");
    //     return;
    // }

    if (!req.body.menuIDs) {
        res.status(400).send("Must provide menu item IDs (menuIDs)!");
        return;
    }

    [query_p1, query_p2] = queries.placeTransactionQueries(req.body.menuIDs.length);

    // Perform transaction
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
    
        // Send queries
        const result_p1 = await client.query({
            rowMode: 'array',
            text: query_p1,
            values: [emp_email]
        });

        var vals = []
        for (let i = 0; i < req.body.menuIDs.length; i++) {
            vals.push(result_p1.rows[0][0]);
            vals.push(req.body.menuIDs[i]);
        }

        console.log(vals);

        const result_p2 = await client.query({
            text: query_p2,
            values: vals
        });

        res.status(200).send("Transaction Complete");
    
        await client.query('COMMIT');
    } catch (err) {
        res.status(400).send("Error sending query: " + err.message);
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
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

    // Send query
    const queryObj = {
        text: queries.getOrderHistoryQuery,
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


/***** /api/transactions/deleteCanceled *****/
// Delete all canceled orders from the DB
router.delete('/deleteCanceled', async (req, res) => {
    [query_p1, query_p2] = queries.deleteCanceledQueries();

    // Perform transaction
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
    
        // Send queries
        const result_p1 = await client.query({
            text: query_p1,
            values: []
        });

        const result_p2 = await client.query({
            text: query_p2,
            values: []
        });

        res.status(200).send(`${result_p2.rows.length} Transactions Deleted`);
    
        await client.query('COMMIT');
    } catch (err) {
        res.status(400).send("Error sending query: " + err.message);
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
});


/***** /api/transactions/:id *****/
// Delete order from the DB
router.delete('/:id', async (req, res) => {
    // Get necessary info from request
    const order_id = req.params.id;

    [query_p1, query_p2] = queries.deleteOrderQueries();

    // Perform transaction
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
    
        // Send queries
        const result_p1 = await client.query({
            text: query_p1,
            values: [order_id]
        });

        const result_p2 = await client.query({
            text: query_p2,
            values: [order_id]
        });

        res.status(200).send("Transaction Deleted");
    
        await client.query('COMMIT');
    } catch (err) {
        res.status(400).send("Error sending query: " + err.message);
        await client.query('ROLLBACK');
    } finally {
        client.release();
    }
});

// Update status of order
router.put('/:id', async (req, res) => {
    // Get necessary info from request
    const order_id = req.params.id;

    if (!req.query.order_status) {
        res.status(400).send("Must provide new order status (order_status)!");
        return;
    }

    // Send query
    const queryObj = {
        text: queries.updateOrderStatusQuery,
        values: [req.query.order_status, order_id]
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