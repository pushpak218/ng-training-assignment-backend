const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const taskRoutes = require('./routes/taskRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize Express
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// Connect to MongoDB Atlas
connectDB();

// Use task routes
app.use('/api', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
