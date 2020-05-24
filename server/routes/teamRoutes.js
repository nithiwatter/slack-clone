const express = require('express');
const teamController = require('../controllers/teamControllers');
const channelController = require('../controllers/channelControllers');
const userController = require('../controllers/userControllers');
const memberController = require('../controllers/memberControllers');
const messageController = require('../controllers/messageControllers');

const teamRouter = express.Router();

teamRouter.get('/', userController.protect, teamController.getTeams);
teamRouter.post('/', userController.protect, teamController.createTeam);
teamRouter.post(
  '/createChannel',
  userController.protect,
  channelController.createChannel
);
teamRouter.post(
  '/markAsRead',
  userController.protect,
  channelController.markAsRead
);
teamRouter.post(
  '/inviteUser',
  userController.protect,
  memberController.inviteMember
);
teamRouter.post(
  '/createMessage',
  userController.protect,
  messageController.createMessage
);

teamRouter.get(
  '/getMessages',
  userController.protect,
  messageController.getMessages
);

teamRouter.post('/getAllMessages', messageController.getAllMessages);

module.exports = teamRouter;
