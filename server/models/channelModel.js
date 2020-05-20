const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A channel name is required.'],
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'A channel must belong to a team.'],
    ref: 'Team',
  },
  public: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;
