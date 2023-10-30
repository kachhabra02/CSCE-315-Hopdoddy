// Necessary requirements
const Pool = require('pg').Pool;
require('dotenv').config();

// Add db credentials
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT
});

// Export connection pool
module.exports = pool;