const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./Routes/routes');
const cors = require('cors');
const port = process.env.PORT || 5000; 

console.log("opal");
const app = express();

//the front path
app.use(cors({
    origin: 'http://localhost:3000' 
  }));

// Apply middleware
app.use(bodyParser.json());

// Register routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
