import MainContainer from '../containers/MainContainer';

function attachListeners(socket, messagesData, component) {
  socket.on('newMessage', (newMessage) => {
    console.log('Receive new message');
    console.log(messagesData);
    console.log(component.state);
    const { channels, currentChannelIdx } = component.state;

    // update the message tracker state
    messagesData[newMessage.channelId].push(newMessage);

    if (channels[currentChannelIdx]._id === newMessage.channelId) {
      component.setState({
        messages: [...messagesData[channels[currentChannelIdx]._id]],
      });
    }
  });
}

export default attachListeners;
