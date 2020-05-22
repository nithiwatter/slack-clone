const Team = require('../models/teamModel');
const Channel = require('../models/channelModel');
const AppError = require('../utils/appError');

exports.getTeams = async (req, res, next) => {
  try {
    // from passing through the protect middleware
    const ownerId = req.user._id;
    const teams = await Team.find({ ownerId }).populate('channels');
    console.log(teams);

    res.status(200).send({
      status: 'success',
      teams,
    });
  } catch (err) {
    next(err);
  }
};

exports.createTeam = async (req, res, next) => {
  try {
    const { name } = req.body;
    const ownerId = req.user._id;
    if (await Team.findOne({ name, ownerId })) {
      return next(new AppError('A team with this name already exists.', 400));
    }
    let team = new Team({ name, ownerId });
    let channel = new Channel({ name: 'general', teamId: team._id });
    await Promise.all([team.save(), channel.save()]);
    team = team.toObject();
    team.channels = [channel];
    res.status(201).json({
      status: 'success',
      team,
    });
  } catch (err) {
    next(err);
  }
};
