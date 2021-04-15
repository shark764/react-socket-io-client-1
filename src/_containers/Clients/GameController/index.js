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
import HitList from '../../../_components/HitList';
import SocketIOSVG from '../../../_components/Logo/SocketIO';
import { log } from '../../../_utilities';
import {
  socketToken,
  gcSocketIOUri,
  gcSocketIOPath,
} from '../../../_utilities/consts';
import { EVENTS } from '../../events';
import Log from './Log';

function GameController() {
  const [, setChannel] = React.useState(null);
  const [socketio, setSocket] = React.useState(null);
  const [gameId, setGameId] = React.useState('');
  const [gameStatus, setGameStatus] = React.useState('no-game');
  const [tempHits, setTempHits] = React.useState([]);
  const [entries, setEntries] = React.useState([]);

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
      log('info', `New connection established to ${gcSocketIOUri}`, socket.id);
      setEntries((allEntries) => [
        {
          text: `New connection established to ${gcSocketIOUri}`,
          timestamp: new Date(),
        },
        ...allEntries,
      ]);

      socket.emit(
        '_game_running-test-data',
        { name: 'John Rambo', nickname: 'John Salchichon' },
        (response) => {
          console.log('response.status GameController', response.status);
        },
      );
    });
    /**
     * New game started
     */
    socket.on(EVENTS.DEVICE.GAME_ADDED, (message) => {
      const { result } = message;
      setGameId(result.id);
      setTempHits([]);
      setGameStatus('started');
      log('info', 'New game has started', message);
      setEntries((allEntries) => [
        { text: 'New game has started', timestamp: new Date() },
        ...allEntries,
      ]);
    });
    /**
     * Hit reveived
     */
    socket.on(EVENTS.DEVICE.TARGET_HIT, (message) => {
      const { result } = message;
      setTempHits((tmpHits) => [...tmpHits, result.data]);
      log('success', 'Target hit received', message);
      setEntries((allEntries) => [
        { text: 'Target hit received', timestamp: new Date() },
        ...allEntries,
      ]);
    });
    /**
     * Game finished
     */
    socket.on(EVENTS.DEVICE.GAME_ENDED, (message) => {
      setGameStatus('finished');
      log('info', 'Game has finished', message);
      setEntries((allEntries) => [
        { text: 'Game has finished', timestamp: new Date() },
        ...allEntries,
      ]);
    });

    socket.on('_game_event-hit', (message) => {
      log('warning', 'An important message', socket.id, message);
    });
  };

  React.useEffect(() => {
    // effect
    const socket = io(gcSocketIOUri, {
      // forceNew: true,
      path: gcSocketIOPath,
      reconnectionDelayMax: 10000,
      withCredentials: true,
      extraHeaders: {
        'levelup-token-header': socketToken,
      },
      query: {
        type: 'device',
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
    socketio.emit(EVENTS.DEVICE.NEW_GAME);
  };
  const handleSendHit = () => {
    socketio.emit(EVENTS.DEVICE.TARGET_HIT, { gameId });
  };
  const handleEndGame = () => {
    socketio.emit(EVENTS.DEVICE.END_GAME, { gameId });
  };

  return (
    <Grid item xs={12} sm={12} lg={12} xl={12} container>
      <Grid item xs={12} sm={12} lg={12} xl={6}>
        <Box elevation={3} m={1} boxShadow={3} p={2}>
          <Typography variant="h5">Game Controller Log</Typography>
          <Log entries={entries} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} lg={12} xl={6}>
        <Box elevation={3} m={1} boxShadow={3} p={2}>
          <Typography variant="h5" display="inline">
            Game Controller Server
          </Typography>
          {' '}
          <Typography display="inline">
            Using
            {' '}
            <Link href="https://socket.io/docs/v4" target="_blank">
              Socket.IO
            </Link>
          </Typography>
          <SocketIOSVG />
          <Box
            elevation={3}
            boxShadow={3}
            p={1}
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
              <CircularProgress color="secondary" size={25} />
            </>
          ) : (
            <Box m={1}>
              <Typography variant="body1" gutterBottom color="secondary">
                Game ID:
                {' '}
                {gameId}
              </Typography>
            </Box>
          )}
          <HitList rows={tempHits} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default GameController;
