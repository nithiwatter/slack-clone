require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const socketio = require('socket.io');
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const server = http.createServer(app);
const io = socketio(server);
server.listen(port, () => console.log(`App is listening at ${port}...`));

io.on('connection', (socket) => {
  console.log('New connection...');

  // Subscribe to all servers - fired after all servers + channels have been loaded by the client
  socket.on('subscribe', (serverId) => {
    socket.join(serverId);
  });

  // A simple chat message sent by client (will include serverId on the object)
  socket.on('message', (message) => {
    io.in(message[1]).emit('newMessage', message[0]);
  });

  socket.on('disconnect', () => {
    console.log('Bye..');
  });
});
