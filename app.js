// Load dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Set up json parsing for express
app.use(express.json());

// Set up morgan middleware
app.use(morgan('tiny'));

// Set up MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Load controllers
const householdsRouter = require('./controllers/households.js');
app.use('/api/households', householdsRouter);

// Set up app to listen to port number (default 3001)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


module.exports = app;