const Pool = require('pg').Pool;

const pool = new Pool({
    user:"csce315_905_02user",
    host:"csce-315-db.engr.tamu.edu",
    database:"csce315_905_02db",
    password: "Password123",
    port: 5432,
});

module.exports = pool;