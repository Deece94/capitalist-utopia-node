// Load dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Set up morgan middleware
app.use(morgan('tiny'));

// Set up MongoDB
const mongoUrl = "";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Load controllers
const householdsRouter = require('./controllers/households.js');
app.use('/api/households', householdsRouter);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
module.exports = app;