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
    // Construct query
    const queryObj = {
        text: queries.viewInventoryQuery,
    };
    
    const client = await pool.connect();
    
    // Send query
    const result = await client.query(queryObj, (error, results) => {
        if (error) {
            res.status(500).send("Error connecting or sending query: " + error.message);
            return;
        }

        // Send response
        res.status(200).json(results.rows);
    });

    client.release();
});

// Add inventory item
router.post('/', async (req, res) => {
    // Get necessary info from request
    // inventoryItemName, inventoryPrice, inventoryQuantity, inventoryUnit

    if (!req.body.name) {
        res.status(400).send("Must provide inventory name (name)!");
        return;
    }

    if (!req.body.price) {
        res.status(400).send("Must provide inventory item price (price)!");
        return;
    }

    if (!req.body.quantity) {
        res.status(400).send("Must provide a quantity for the item (quantity)!");
        return;
    }

    if (!req.body.unit) {
        res.status(400).send("Must provide a unit for the item (unit)!");
        return;
    }

    const client = await pool.connect();

    // Build query
    const queryObj = {
        text: queries.addInventoryItemQuery,
        values: [req.body.name, req.body.price, req.body.quantity, req.body.unit]
    };
    
    // Send query
    const result = await client.query(queryObj, (error, results) => {
        if (error) {
            res.status(500).send("Error connecting or sending query: " + error.message);
            // res.status(400).send("Error adding Inventory Item: " + err.message);
            return;
        }

        // Send response
        res.status(201).send("Item added to Inventory.");
    });
    
    client.release();
});


/***** /api/inventory/:id *****/
// Update inventory item
router.put('/:id', async (req, res) => {
    // Get necessary info from request
    const itemID = req.params.id;

    if (!itemID) {
        res.status(400).send("Must provide an inventoryID in paramaters!");
        return;
    }
    
    var givenVals = []

    if (req.body.name) {
        givenVals.push(req.body.name);
    }

    if (req.body.price) {
        givenVals.push(req.body.price);
    }

    if (req.body.quantity) {
        givenVals.push(req.body.quantity);
    }

    if (req.body.unit) {
        givenVals.push(req.body.unit);
    }

    givenVals.push(itemID);

    const client = await pool.connect();

    // Build query
    const queryObj = {
        text: queries.updateInventoryItemQuery(req.body.name, req.body.price, req.body.quantity, req.body.unit, itemID),
        values: givenVals // Passing supplied arguments directly
    };


    // Send query
    const result = await client.query(queryObj, (error, results) => {
        if (error) {
            res.status(500).send("Error connecting or sending query: " + error.message);
            return;
        }

        // Send response
        res.status(200).send("Item updated successfully in Inventory.");
    });

    client.release();
});

// Delete inventory item
router.delete('/:id', async (req, res) => {
    // Get necessary info from request
    const itemID = req.params.id;
    var vals = []

    if (!itemID) {
        res.status(400).send("Must provide an inventoryID in paramaters!");
        return;
    }
    
    vals.push(itemID);

    const client = await pool.connect();

    // Build query
    const queryObj = {
        text: queries.deleteInventoryItemQuery,
        values: vals
    };

    // Send query
    const result = await client.query(queryObj, (error, results) => {
        if (error) {
            res.status(500).send("Error connecting or sending query: " + error.message);
            return;
        }

        // Send response
        res.status(200).send("Item deleted successfully from Inventory.");
    });
    
    client.release();
});


// Export URI router
module.exports = router
