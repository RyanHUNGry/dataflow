const express = require('express');
const usersRouter = express.Router();

const {signupUser, loginUser, refreshAccessToken, logoutUser} = require('./users.controller');

usersRouter.post('/signup', signupUser);
usersRouter.post('/login', loginUser);
usersRouter.post('/token', refreshAccessToken);
usersRouter.delete('/logout', logoutUser);

module.exports = usersRouter;

