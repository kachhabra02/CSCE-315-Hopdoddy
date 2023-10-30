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

    if (!req.body.inventoryItemName) {
        res.status(400).send("Must provide inventory name (inventoryItemName)!");
        return;
    }

    if (!req.body.inventoryPrice) {
        res.status(400).send("Must provide inventory item price (inventoryPrice)!");
        return;
    }

    if (!req.body.inventoryQuantity) {
        res.status(400).send("Must provide a quantity for (inventoryQuantity)!");
        return;
    }

    if (!req.body.inventoryUnit) {
        res.status(400).send("Must provide a unit for (inventoryUnit)!");
        return;
    }

    const client = await pool.connect();

    // Build query
    const queryObj = {
        text: queries.addInventoryItemQuery,
        values: [req.body.inventoryItemName, req.body.inventoryPrice, req.body.inventoryQuantity, req.body.inventoryUnit]
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

    var givenVals = []

    if (!itemID) {
        res.status(400).send("Must provide an inventoryID in paramaters!");
        return;
    }

    if (req.body.inventoryItemName) {
        givenVals.push(req.body.inventoryItemName);
    }

    if (req.body.inventoryPrice) {
        givenVals.push(req.body.inventoryPrice);
    }

    if (req.body.inventoryQuantity) {
        givenVals.push(req.body.inventoryQuantity);
    }

    if (req.body.inventoryUnit) {
        givenVals.push(req.body.inventoryUnit);
    }

    givenVals.push(itemID);

    const client = await pool.connect();

    // Build query

    const queryObj = {
        text: queries.updateInventoryItemQuery(req.body.inventoryItemName, req.body.inventoryPrice, req.body.inventoryQuantity, req.body.inventoryUnit, itemID),
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
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query

    client.release();

    // TODO: Send response
    res.send("Delete inventory item");
});


// Export URI router
module.exports = router