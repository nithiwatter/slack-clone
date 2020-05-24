const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'A text is required.'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'A user/writer is required.'],
      ref: 'User',
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'A message must belong to a channel.'],
      ref: 'Channel',
    },
  },
  { timestamps: true }
);

messageSchema.virtual('users', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: false,
});

messageSchema.set('toObject', { virtuals: true });
messageSchema.set('toJSON', { virtuals: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
