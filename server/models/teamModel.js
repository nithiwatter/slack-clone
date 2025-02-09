const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A team name is required.'],
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'A team owner is required.'],
    ref: 'User',
  },
});

teamSchema.virtual('channels', {
  ref: 'Channel',
  localField: '_id',
  foreignField: 'teamId',
  justOne: false,
});

teamSchema.set('toObject', { virtuals: true });
teamSchema.set('toJSON', { virtuals: true });

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
