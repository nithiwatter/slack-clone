const Channel = require('../models/channelModel');
const AppError = require('../utils/appError');

exports.createChannel = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, teamId, public } = req.body;

    if (await Channel.findOne({ name, teamId }))
      return next(
        new AppError('A channel with this name already exists.', 400)
      );

    const channel = new Channel({ name, teamId, public });
    await channel.save();
    res.status(200).json({
      status: 'success',
      channel,
    });
  } catch (err) {
    next(err);
  }
};
