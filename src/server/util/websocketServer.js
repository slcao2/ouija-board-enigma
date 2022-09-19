const ws = require('ws');
const {handleVote} = require('../websockets/votesSocket.js');

let websocketServer;

const initializeWebsocketServer = (expressServer) => {
  websocketServer = new ws.Server({
    noServer: true,
    path: '/ws',
    clientTracking: true,
  });

  expressServer.on('upgrade', (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit('connection', websocket, request);
    });
  });

  websocketServer.broadcast = (message) => {
    websocketServer.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  };

  websocketServer.on('connection', (websocketConnection, connectionRequest) => {
    handleVote(websocketConnection, websocketServer);
  });


  return websocketServer;
};

module.exports = {
  initializeWebsocketServer,
};
