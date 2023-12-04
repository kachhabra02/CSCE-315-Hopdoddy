// General app requirements
const express = require('express');
const app = express();

// Configure port to listen on
require('dotenv').config();
const address = (process.env.ADDRESS || "http://localhost");
const port = (process.env.PORT || 8080);

// Import routers for functionality
const transactions = require('./restAPI/transactions');
const menu = require('./restAPI/menu');
const inventory = require('./restAPI/inventory');
const reports = require('./restAPI/reports');
const users = require('./restAPI/users');

// Add other middleware to be used
const cors = require('cors');
app.use(cors());
app.use(express.json()); // parses JSON payloads/body

// Add routes to the app
app.use("/api/transactions", transactions);
app.use("/api/menu", menu);
app.use("/api/inventory", inventory);
app.use("/api/reports", reports);
app.use("/api/users", users);

// Add base route to test setup
app.get('/api', (req, res) => {
  res.send('Hello, World!');
});

// Begin listening on determined port
app.listen(port, () => {
  console.log(`Server running at ${address}:${port}/`);
});