const Team = require('../models/teamModel');
const User = require('../models/userModel');
const Member = require('../models/memberModel');
const AppError = require('../utils/appError');

exports.inviteMember = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const teamPromise = Team.findById(req.body.teamId);
    const inviteePromise = User.findOne({ username: req.body.username });
    const [team, invitee] = await Promise.all([teamPromise, inviteePromise]);

    if (!team.ownerId.equals(ownerId))
      return next(new AppError('You are not the owner of this team.', 400));
    if (!invitee)
      return next(new AppError('No user with this username exists.', 400));

    if (await Member.findOne({ teamId: team._id, userId: invitee._id }))
      return next(new AppError('You have already invited this user.', 400));
    const member = new Member({ teamId: team._id, userId: invitee._id });
    await member.save();
    res.status(200).json({
      status: 'success',
      member,
    });
  } catch (err) {
    next(err);
  }
};
