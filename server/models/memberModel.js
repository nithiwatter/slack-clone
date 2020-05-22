const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'A member is a user.'],
    ref: 'User',
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'A member must belong to a team.'],
    ref: 'Team',
  },
});

memberSchema.virtual('teams', {
  ref: 'Team',
  localField: 'teamId',
  foreignField: '_id',
  justOne: false,
});

memberSchema.set('toObject', { virtuals: true });
memberSchema.set('toJSON', { virtuals: true });

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
