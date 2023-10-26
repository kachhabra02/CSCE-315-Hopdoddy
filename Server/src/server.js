require('dotenv').config();
const express = require('express');
const app = express();
const dbRoutes = require('./restAPI/routes');
const port = process.env.PORT || 5000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api/db", dbRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});