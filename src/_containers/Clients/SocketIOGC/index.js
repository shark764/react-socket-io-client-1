import {
  Button,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Link,
} from '@material-ui/core';
import React from 'react';
import { io } from 'socket.io-client';
import { log, socketIOGCEndpoint, socketToken } from '../../../utilities';
import HitList from '../../../_components/HitList';
import SocketIOSVG from '../../../_components/Logo/SocketIO';

// const socket = io("https://example.com"); // the main namespace
// const productSocket = io("https://example.com/product", { forceNew: true }); // the "product" namespace
// const orderSocket = io("https://example.com/order", { forceNew: true }); // the "order" namespace

function SocketIOGC() {
  const [, setChannel] = React.useState(null);
  const [socketio, setSocket] = React.useState(null);
  const [gameId, setGameId] = React.useState('');
  const [gameStatus, setGameStatus] = React.useState('no-game');
  const [tempHits, setTempHits] = React.useState([]);

  const handleSocketCommunication = (socket) => {
    /**
     * Open socket
     */
    socket.open();
    /**
     * Connection established
     */
    socket.on('connect', () => {
      setChannel(socket.connected ? socket.id : '');
      log(
        'info',
        `New connection established to ${socketIOGCEndpoint}`,
        socket.id,
      );

      socket.emit('_game_running-test-data', {
        name: 'John Rambo',
        nickname: 'John Salchichon',
      });
    });
    /**
     * New game started
     */
    socket.on('__reporting_bff_::_game_event::_started', (message) => {
      setGameId(message.id);
      setTempHits([]);
      setGameStatus('started');
      log('info', 'New game has started', message);
    });
    /**
     * Hit reveived
     */
    socket.on('__reporting_bff_::_game_event::_target-hit', (message) => {
      setTempHits((tmpHits) => [...tmpHits, message.data]);
      log('success', 'Target hit received', message);
    });
    /**
     * Game finished
     */
    socket.on('__reporting_bff_::_game_event::_finished', (message) => {
      setGameStatus('finished');
      log('info', 'Game has finished', message);
    });

    socket.on('_game_event-hit', (message) => {
      log('warning', 'An important message', socket.id, message);
    });
  };

  React.useEffect(() => {
    // effect
    const socket = io(socketIOGCEndpoint, {
      // forceNew: true,
      path: '/game-controller-socket.io',
      reconnectionDelayMax: 10000,
      withCredentials: true,
      extraHeaders: {
        'levelup-token-header': socketToken,
      },
    });
    setSocket(socket);

    handleSocketCommunication(socket);

    return () => {
      // cleanup
      socket.close();
    };
  }, []);

  const handleNewGame = () => {
    socketio.emit('__device_::_game_event::_new-game');
  };
  const handleSendHit = () => {
    socketio.emit('__device_::_game_event::_target-hit', { gameId });
  };
  const handleEndGame = () => {
    socketio.emit('__device_::_game_event::_end-game', { gameId });
  };

  return (
    <Grid item xs={12} sm={12} lg={12} xl={12}>
      <Box elevation={3} m={2} boxShadow={3} p={4}>
        <Typography variant="h4" display="inline">
          Using
          {' '}
          <Link href="https://socket.io/docs/v4" target="_blank">
            Socket.IO
          </Link>
        </Typography>
        {' '}
        <SocketIOSVG />
        <Box
          elevation={3}
          m={2}
          boxShadow={3}
          p={4}
          justifyContent="center"
          alignContent="center"
        >
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={handleNewGame}
            disabled={gameStatus === 'started'}
          >
            New Game
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={handleSendHit}
            disabled={gameStatus !== 'started'}
          >
            Hit
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={handleEndGame}
            disabled={gameStatus !== 'started'}
          >
            End Game
          </Button>
        </Box>
        {!gameId ? (
          <>
            <Typography color="primary">Waiting for a Game</Typography>
            <CircularProgress color="secondary" />
          </>
        ) : (
          <Typography variant="h6" gutterBottom color="secondary">
            Game ID:
            {' '}
            {gameId}
          </Typography>
        )}
        <HitList rows={tempHits} />
      </Box>
    </Grid>
  );
}

export default SocketIOGC;
