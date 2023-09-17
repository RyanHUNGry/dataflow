const express = require('express');
const morgan = require('morgan');

const passport = require('../src/configs/passport.config');
const flowsRouter = require('./api/routes/flows/flows.router');
const usersRouter = require('./api/routes/users/users.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(passport.initialize());

app.use('/flows', flowsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to dataflow. Seeing this page means the API is up and running :)');
});

module.exports = app;
