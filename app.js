const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const householdsRouter = require('./controllers/households.js');
const loginRouter = require('./controllers/login.js');
const registerRouter = require('./controllers/register.js');
const middleware = require('./utils/middleware');

// Load express app
const app = express();


// Set up json parsing for express
app.use(cors());
app.use(express.json());

// Set up morgan logging
app.use(morgan('tiny'));

// Set up MongoDB connection
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Load authentications middleware
app.use(middleware.authVerifier);


// Load controllers
app.use('/households', householdsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// Load error handlinbg middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Set up app to listen to port number (default 3001)
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})


module.exports = app;