import React from 'react';
import { io } from 'socket.io-client';

// const socket = io("https://example.com"); // the main namespace
// const productSocket = io("https://example.com/product", { forceNew: true }); // the "product" namespace
// const orderSocket = io("https://example.com/order", { forceNew: true }); // the "order" namespace

const port = 3010;
const endpoint = `http://localhost:${port}?type=devices`;
console.log('endpoint', endpoint);

function SocketIO() {
  React.useEffect(() => {
    const socket = io(endpoint, {
      path: '/levelup-socket.io',
      reconnectionDelayMax: 10000,
      withCredentials: true,
      extraHeaders: {
        'levelup-token-header':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    });

    socket.open();
    socket.on('connect', () => {
      // setChannel(socket.connected ? socket.id : '')
      console.log('socket.id', socket.id);

      socket.emit('_game_running-test-data', {
        name: 'John Salchichon',
        nickname: 'John Wick',
      });
    });

    socket.on('_game_event-hit', (data) => {
      // setResponse(data);
      console.log('_game_event-hit', data);
    });
  }, []);

  return <div></div>;
}

export default SocketIO;
