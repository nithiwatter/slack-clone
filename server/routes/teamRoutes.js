const express = require('express');
const teamController = require('../controllers/teamControllers');
const channelController = require('../controllers/channelControllers');
const userController = require('../controllers/userControllers');

const teamRouter = express.Router();

teamRouter.get('/', userController.protect, teamController.getTeams);
teamRouter.post('/', userController.protect, teamController.createTeam);
teamRouter.post(
  '/createChannel',
  userController.protect,
  channelController.createChannel
);

module.exports = teamRouter;
