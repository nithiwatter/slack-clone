function attachListeners(socket, messagesData, component) {
  socket.on('newMessage', (newMessage) => {
    console.log('Receive new message');
    const { channels, currentChannelIdx } = component.state;
    const serverId = newMessage[1];
    newMessage = newMessage[0];

    // update the message tracker state
    messagesData[newMessage.channelId].push(newMessage);

    if (channels[currentChannelIdx]._id === newMessage.channelId) {
      component.setState({
        messages: [...messagesData[channels[currentChannelIdx]._id]],
      });
    } else {
      const readTracker = { ...component.state.readTracker };
      const notiTracker = { ...component.state.notiTracker };
      notiTracker[serverId] += 1;
      readTracker[newMessage.channelId] += 1;
      console.log(notiTracker);
      component.setState({
        readTracker,
        notiTracker,
      });
    }
  });

  socket.on('channelCreated', (newChannel) => {
    const serverId = newChannel[1];

    newChannel = newChannel[0];
    const teams = [...component.state.teams];
    const teamWithNewChannelIdx = teams.findIndex(
      (team) => team._id === serverId
    );
    const teamWithNewChannel = { ...teams[teamWithNewChannelIdx] };
    teamWithNewChannel.channels = [...teamWithNewChannel.channels, newChannel];
    teams[teamWithNewChannelIdx] = teamWithNewChannel;
    messagesData[newChannel._id] = [];

    const readTracker = { ...component.state.readTracker };
    readTracker[newChannel._id] = 0;
    if (
      component.state.teams[component.state.currentTeamIdx]._id === serverId
    ) {
      component.setState({
        teams,
        readTracker,
        channels: teamWithNewChannel.channels,
      });
    } else {
      component.setState({ teams, readTracker });
    }
  });

  socket.on('newInvitation', async (newTeam) => {
    console.log(newTeam);
    let username = newTeam[1];
    newTeam = newTeam[0];

    if (component.props.user.username !== username) return;
    component.socket.emit('subscribe', newTeam._id);
    const newTeams = [...component.state.teams, newTeam];
    const readTracker = { ...component.state.readTracker };
    const notiTracker = { ...component.state.notiTracker };
    notiTracker[newTeam._id] = 0;
    readTracker[newTeam.channels[0]._id] = 0;
    messagesData[newTeam.channels[0]._id] = [];

    component.setState({
      teams: newTeams,
      readTracker,
      notiTracker,
    });
  });
}

export default attachListeners;
