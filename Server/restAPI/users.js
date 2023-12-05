// Necessary requirements
const express = require('express')
const router = express.Router()

// Retrieve connection pool
const pool = require('./db');

// Import SQL queries
const queries = require('./queries');


/***** /api/users *****/
// Get information for all users
router.get('/', async (req, res) => {
    // Get necessary info from request
    const email = req.query.email;

    // Send query
    const queryObj = 
        (!email)
        ?
            {
                text: queries.getAllUsersQuery,
                values: []
            }
        :
            {
                text: queries.getUserFromEmailQuery,
                values: [email]
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

// Add new user
router.post('/', async (req, res) => {
    // Get necessary info from request
    if (!req.body.first_name) {
        res.status(400).send("Must provide employee's first name (first_name)!");
        return;
    }

    if (!req.body.last_name) {
        res.status(400).send("Must provide employee's last name (last_name)!");
        return;
    }

    if (!req.body.email) {
        res.status(400).send("Must provide employee's email (email)!");
        return;
    }

    if (req.body?.is_manager === undefined) {
        res.status(400).send("Must provide manager status (is_manager)!");
        return;
    }

    if (req.body?.is_admin === undefined) {
        res.status(400).send("Must provide admin status (is_admin)!");
        return;
    }

    // Send Query
    const queryObj = {
        text: queries.addUserQuery,
        values: [req.body.first_name, req.body.last_name, req.body.email, req.body.is_manager, req.body.is_admin]
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


/***** /api/users/:id *****/
// Get specific user information
router.get('/:id', async (req, res) => {
    // Get necessary info from request
    const emp_id = req.params.id;

    // Send query
    const queryObj = {
        text: queries.getUserQuery,
        values: [emp_id]
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

// Update user information
router.put('/:id', async (req, res) => {
    // Get necessary info from request
    const emp_id = req.params.id;

    if (!req.body.first_name) {
        res.status(400).send("Must provide employee's first name (first_name)!");
        return;
    }

    if (!req.body.last_name) {
        res.status(400).send("Must provide employee's last name (last_name)!");
        return;
    }

    if (!req.body.email) {
        res.status(400).send("Must provide employee's email (email)!");
        return;
    }

    if (req.body?.is_manager === undefined) {
        res.status(400).send("Must provide manager status (is_manager)!");
        return;
    }

    if (!req.body?.is_admin === undefined) {
        res.status(400).send("Must provide admin status (is_admin)!");
        return;
    }

    // Send Query
    const queryObj = {
        text: queries.updateUserQuery,
        values: [req.body.first_name, req.body.last_name, req.body.email, req.body.is_manager, req.body.is_admin, emp_id]
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

// Delete user
router.delete('/:id', async (req, res) => {
    // Get necessary info from request
    const emp_id = req.params.id;

    // Send query
    const queryObj = {
        text: queries.deleteUserQuery,
        values: [emp_id]
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