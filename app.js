// Load dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const householdsRouter = require('./controllers/households.js');
require('dotenv').config();

const app = express();

// Set up json parsing for express
app.use(cors());
app.use(express.json());

// Set up morgan middleware
app.use(morgan('tiny'));

// Set up MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Load controllers
app.use('/api/households', householdsRouter);

// Handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

// handler of requests with result to errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } 

  next(error);
}

app.use(errorHandler);

// Set up app to listen to port number (default 3001)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})


module.exports = app;