const Message = require('../models/messageModel');
const AppError = require('../utils/appError');

exports.getAllMessages = async (req, res, next) => {
  // data will be an object with server keys and arrays of channels { s1: [c1, c2...], s2: [] }
  const result = {};
  const promises = [];

  for (let i = 0; i < req.body.channels.length; i++) {
    const promise = Message.find({ channelId: req.body.channels[i] })
      .populate({
        path: 'users',
        select: '-_id -password -truePassword -__v',
      })
      .limit(20)
      .then((docs) => {
        result[req.body.channels[i]] = docs;
      });
    promises.push(promise);
  }

  await Promise.all(promises);
  res.status(200).json({ status: 'success', data: result });
};

exports.createMessage = async (req, res, next) => {
  const userId = req.user._id;
  const channelId = req.body.channelId;
  const text = req.body.text;

  let message = new Message({ userId, channelId, text });
  await message.save();

  message = message.toObject();
  message.users = [{ name: req.user.name, username: req.user.username }];

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
