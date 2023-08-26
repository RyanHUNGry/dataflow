const express = require('express');
const tasksRouter = express.Router();
const passport = require('../../../../configs/passport.config');
const {createTask, deleteTask} = require('./tasks.controller');

tasksRouter.post('/', passport.authenticate('jwt', {session: false}), createTask);
tasksRouter.delete('/', passport.authenticate('jwt', {session: false}), deleteTask);

module.exports = tasksRouter;
