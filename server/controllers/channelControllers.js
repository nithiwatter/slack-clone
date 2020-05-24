const Channel = require('../models/channelModel');
const Member = require('../models/memberModel');
const AppError = require('../utils/appError');

exports.createChannel = async (req, res, next) => {
  try {
    const { name, teamId, public } = req.body;

    if (await Channel.findOne({ name, teamId }))
      return next(
        new AppError('A channel with this name already exists.', 400)
      );

    const channel = new Channel({ name, teamId, public });
    channel.readReceipt = {
      [req.user._id]: Date.now(),
    };
    await channel.save();
    res.status(200).json({
      status: 'success',
      channel,
    });
  } catch (err) {
    next(err);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    if (
      !(await Member.findOne({ teamId: req.body.teamId, userId: req.user._id }))
    ) {
      return next(new AppError('You do not belong to this team.', 400));
    }
    const channel = await Channel.findById(req.body.channelId);
    channel.readReceipt[req.user._id] = Date.now();
    channel.markModified('readReceipt');
    await channel.save();
    res.status(200).json({
      status: 'success',
      channel,
    });
  } catch (err) {
    next(err);
  }
};
