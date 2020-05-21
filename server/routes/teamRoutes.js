const express = require('express');
const teamController = require('../controllers/teamControllers');

const teamRouter = express.Router();

teamRouter.post('/', teamController.getTeams);
teamRouter.post('/', teamController.createTeam);

module.exports = teamRouter;
