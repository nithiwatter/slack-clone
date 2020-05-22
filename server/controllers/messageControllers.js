const Message = require('../models/messageModel');
const AppError = require('../utils/appError');

exports.createMessage = async (req, res, next) => {
  const userId = req.user._id;
  const channelId = req.body.channelId;
  const text = req.body.text;

  const message = new Message({ userId, channelId, text });
  await message.save();

  res.status(200).json({
    status: 'success',
    message,
  });
};

exports.getMessages = async (req, res, next) => {
  const messages = await Message.find({
    channelId: req.headers['channel'].split(' ')[1],
  });

  res.status(200).json({
    status: 'success',
    messages,
  });
};
