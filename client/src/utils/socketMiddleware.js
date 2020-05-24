function attachListeners(socket, messagesData, component) {
  socket.on('newMessage', (newMessage) => {
    console.log('Receive new message');
    console.log(messagesData);
    console.log(component.state);
    const { channels, currentChannelIdx } = component.state;

    // update the message tracker state
    console.log(messagesData[newMessage.channelId]);
    messagesData[newMessage.channelId].push(newMessage);
    console.log(messagesData[newMessage.channelId]);

    if (channels[currentChannelIdx]._id === newMessage.channelId) {
      component.setState({
        messages: [...messagesData[channels[currentChannelIdx]._id]],
      });
    } else {
      const readTracker = { ...component.state.readTracker };
      readTracker[newMessage.channelId] += 1;
      component.setState({
        readTracker,
      });
    }
  });
}

export default attachListeners;
