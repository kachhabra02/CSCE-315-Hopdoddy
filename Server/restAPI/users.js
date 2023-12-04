// Necessary requirements
const express = require('express')
const router = express.Router()

// Retrieve connection pool
const pool = require('./db');

// Import SQL queries
const queries = require('./queries');


/***** /api/users *****/
// Get information for all users
// TODO

// Add new user
// TODO


/***** /api/users/:id *****/
// Update user information
// TODO

// Delete user
// TODO


// Export URI router
module.exports = router