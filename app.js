// Load config variables
const config = require('./utils/config');

// Load express app
const express = require('express');
const app = express();



// Set up json parsing for express
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Set up morgan logging
const morgan = require('morgan');
app.use(morgan('tiny'));

// Set up MongoDB connection
const mongoose = require('mongoose');
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Load routers
const householdsRouter = require('./controllers/households.js');
const loginRouter = require('./controllers/login.js');
const registerRouter = require('./controllers/register.js');

// Load controllers
app.use('/api/households', householdsRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

// Load middleware
const middleware = require('./utils/middleware');
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Set up app to listen to port number (default 3001)
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})


module.exports = app;